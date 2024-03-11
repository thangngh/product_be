import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductBodyDTO } from '@shared/dtos/product/create.dto';
import { CreateProductItemBodyDTO } from '@shared/dtos/product/product_item/create.dto';
import { CreateProductInventoryWithAttributeBodyDTO } from '@shared/dtos/product/product_inventory/create.dto';
import { User } from '../user/entities/user.entity';
import { SYSTEM_CODE } from '@shared/constant';
import { ProductItemService } from '../product_item/product_item.service';
import { ProductInventoryService } from '../product_inventory/product_inventory.service';
import { ProductAttributeService } from '../product_attribute/product_attribute.service';
import { ProductFileData } from './productFileData';
import { PaginationDTO } from '@shared/pagination/dto/paginationQuery-dto';
import { Pagination } from '@shared/pagination';
import { GetAllProductResponse, Item } from '@shared/dtos/product/get.dto';
import { Product } from './entities/product.entity';
import { StorageService } from '@config/storage/stograge.service';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productItemService: ProductItemService,
        private readonly productInventoryService: ProductInventoryService,
        private readonly productAttributeService: ProductAttributeService,
        public storageService: StorageService
    ) { }

    getProductRepository() {
        return this.productRepository;
    }

    async create(
        user: User,
        body: {
            productBody: CreateProductBodyDTO,
            bodyProductItem: CreateProductItemBodyDTO[],
            bodyProductInventory: CreateProductInventoryWithAttributeBodyDTO[],
        },
        files: {
            bodyProductItem?: Record<string, Array<Express.Multer.File>>;
            bodyProductInventory?: Record<string, Array<Express.Multer.File>>;
        },
    ) {
        const { productBody, bodyProductInventory } = body;
        const { id } = user;

        const product = await this.productRepository.createProduct(id, productBody)

        if (!product) {
            throw new InternalServerErrorException(SYSTEM_CODE.SORRY_SOMETHING_WENT_WRONG)
        }

        const updatedProductItem: (CreateProductItemBodyDTO & { productId: string })[] = (files as ProductFileData[])
            .filter(((item) => item.fieldName === 'bodyProductItem'))
            .map((item) => ({
                productId: product.id,
                image: item.type === 'image' && item.fieldName === 'bodyProductItem' ? item.id : null,
                video: item.type === 'video' && item.fieldName === 'bodyProductItem' ? item.id : null,
            }))

        const insertedProductItem = this.productItemService.create(updatedProductItem ?? []);
        const updatedProductInventory = (files as ProductFileData[]).filter((item) => item.fieldName === 'bodyProductInventory')
            .map((item) => {
                return bodyProductInventory.map((itemProductInventory) => {
                    return {
                        ...itemProductInventory,
                        productId: product.id,
                        image: item.id
                    }
                })
            })
            .flatMap((inventory) => inventory)

        const insertedProductInventory = Promise.all(updatedProductInventory.flatMap(
            async (inventory) => {
                const inventoryWithAttributes = inventory as unknown as CreateProductInventoryWithAttributeBodyDTO;

                const insertedInventory = await this.productInventoryService.create([inventoryWithAttributes]);

                const updatedBodyProductAttribute = inventoryWithAttributes.bodyProductAttribute.map((item) => ({
                    ...item,
                    productInventoryId: insertedInventory[0].id
                }))

                const insertedProductAttribute = updatedBodyProductAttribute.length > 0
                    && await this.productAttributeService.create(updatedBodyProductAttribute);

                return {
                    inventory: insertedInventory,
                    attributes: insertedProductAttribute,
                };
            }) ?? []);

        const [insertedProductItems, insertedProductInventories] = await Promise.all([insertedProductItem, insertedProductInventory]);

        return {
            product,
            insertedProductItems,
            insertedProductInventories,
        };
    }

    async getAllProduct(body: PaginationDTO & { userId?: string }): Promise<Pagination<GetAllProductResponse>> {
        const { limit, page, userId } = body
        const { results, total } = await this.productRepository.getAllProduct(limit, page, userId);

        const itemResults = await Promise.all(results.map(async (product: Product) => {
            // Use Promise.all to parallelize the async calls to getImage
            const productItem = await Promise.all(
                product.productItem.flatMap(async (item) => product.id === item.productId ? {
                    id: item.id,
                    image: await this.storageService.getImage(item.image),
                    productId: item.productId
                } : []))

            const productInventory = await Promise.all(product.productInventory.flatMap(
                async (inventory) => product.id === inventory.productId ? {
                    id: inventory.id,
                    createAt: inventory.createAt,
                    isActive: inventory.isActive,
                    image: await this.storageService.getImage(inventory.image),
                    productId: inventory.id,
                    priceOut: inventory.priceOut,
                    quantity: inventory.quantity,
                    productAttribute: inventory.productAttribute.flatMap((attribute) => attribute.productInventoryId === inventory.id ? {
                        id: attribute.id,
                        name: attribute.name,
                        value: attribute.value,
                        isActive: attribute.isActive
                    } : [])
                } : []));

            return {
                id: product.id,
                productName: product.productName,
                desc: product.desc,
                createAt: product.createAt,
                isActive: product.isActive,
                brandId: product.brandId,
                manufactureId: product.manufactureId,
                userId: product.userId,
                manufacturer: {
                    id: product.manufacturer.id,
                    manufactureName: product.manufacturer.manufacturerName
                },
                user: {
                    id: product.user.id,
                    name: `${product.user.firstName} ${product.user.lastName}`
                },
                brand: {
                    id: product.brand.id,
                    brandName: product.brand.brandName
                },
                item: [...productItem, ...productInventory] as Item[]
            }

        }))

        return new Pagination<GetAllProductResponse>({
            results: itemResults,
            total,
        })
    }

    async getAllProductByOwner(user: User, { limit, page }: PaginationDTO) {

        const { results, total } = await this.getAllProduct({ limit, page, userId: user.id });
    }
}
