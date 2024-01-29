import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductBodyDTO } from '@shared/dtos/product/create.dto';
import { CreateProductItemBodyDTO } from '@shared/dtos/product/product_item/create.dto';
import { CreateProductInventoryBodyDTO, CreateProductInventoryWithAttributeBodyDTO } from '@shared/dtos/product/product_inventory/create.dto';
import { User } from '../user/entities/user.entity';
import { SYSTEM_CODE } from '@shared/constant';
import { ProductItemService } from '../product_item/product_item.service';
import { ProductInventoryService } from '../product_inventory/product_inventory.service';
import { ProductAttributeService } from '../product_attribute/product_attribute.service';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productItemService: ProductItemService,
        private readonly productInventoryService: ProductInventoryService,
        private readonly productAttributeService: ProductAttributeService
    ) { }

    async create(
        user: User,
        productBody: CreateProductBodyDTO,
        productItemBody: CreateProductItemBodyDTO[],
        productInventoryBody: CreateProductInventoryWithAttributeBodyDTO[],
    ) {
        const { id } = user;

        const product = await this.productRepository.createProduct(id, productBody)

        if (!product) {
            throw new InternalServerErrorException(SYSTEM_CODE.SORRY_SOMETHING_WENT_WRONG)
        }

        const updatedBodyProductItem = productItemBody.map(item => ({ ...item, productId: product.id }));

        const insertedProductItem = await this.productItemService.create(updatedBodyProductItem);

        const insertedProductInventories = await Promise.all(productInventoryBody.map(
            async (inventory: CreateProductInventoryWithAttributeBodyDTO) => {

                const insertedInventory = await this.productInventoryService.create([{ ...inventory, productId: product.id }]);

                const updatedBodyProductAttribute = inventory.bodyProductAttribute.map((item) => ({
                    ...item,
                    productInventoryId: insertedInventory[0].id
                }))

                const insertedProductAttribute = updatedBodyProductAttribute.length > 0
                    && await this.productAttributeService.create(updatedBodyProductAttribute);

                return {
                    inventory: insertedInventory,
                    attributes: insertedProductAttribute,
                };
            }));

        return {
            product,
            insertedProductItem,
            insertedProductInventories,
        };
    }
}
