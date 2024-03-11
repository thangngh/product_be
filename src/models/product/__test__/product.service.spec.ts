import { ProductItemService } from "../../product_item/product_item.service";
import { ProductRepository } from "../product.repository";
import { ProductService } from "../product.service"
import { StorageService } from "@config/storage/stograge.service";
import { Test, TestingModule } from "@nestjs/testing";
import { StorageModule } from "@config/storage/storage.module";
import { ProductItemModule } from "@models/product_item/product_item.module";
import { ProductInventoryModule } from "@models/product_inventory/product_inventory.module";
import { ProductAttributeModule } from "@models/product_attribute/product_attribute.module";
import { ProductInventoryService } from "@models/product_inventory/product_inventory.service";
import { ProductAttributeService } from "@models/product_attribute/product_attribute.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { ProductItemRepository } from "@models/product_item/product_item.repository";
import { ProductInventory } from "@models/product_inventory/entities/product_inventory.entity";
import { Manufacturer } from "@models/manufacturer/entities/manufacturer.entity";
import { Brand } from "@models/brand/entities/brand.entity";
import { User } from "@models/user/entities/user.entity";
import { ProductItem } from "@models/product_item/entities/product_item.entity";
import { ProductInventoryRepository } from "@models/product_inventory/product_inventory.repository";
import { DataSource, Repository } from "typeorm";
import { ProductAttributeRepository } from "@models/product_attribute/product_attribute.repository";
import { ProductAttribute } from "@models/product_attribute/entities/product_attribute.entity";
import { GetAllProductResponse } from "@shared/dtos/product/get.dto";

class MockDataSource {
    // Implement necessary methods or properties used by ProductRepository
    createEntityManager() {
        // Mock implementation of createEntityManager() method
    }
}

describe('ProductService', () => {
    let productService: ProductService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: ProductRepository,
                    useClass: ProductRepository
                },
                {
                    provide: DataSource,
                    useClass: MockDataSource
                },
                ProductItemService,
                {
                    provide: ProductItemRepository,
                    useClass: ProductItemRepository
                },
                ProductInventoryService,
                {
                    provide: ProductInventoryRepository,
                    useClass: ProductInventoryRepository
                },
                ProductAttributeService,
                {
                    provide: ProductAttributeRepository,
                    useClass: ProductAttributeRepository
                },
                StorageService
            ]
        }).compile()
        productService = moduleRef.get<ProductService>(ProductService)
    })

    it('should be defined', () => {
        expect(productService).toBeDefined();
    });

    it('should return paginated products', async () => {
        // Mock data and dependencies
        const mockPaginationDTO = { limit: 10, page: 1 };

        const mockResults: GetAllProductResponse[] = [
            {
                "id": "d413fa50-5bea-4483-a7ff-d475391c8a3e",
                "productName": "booking",
                "desc": "story book 1",
                "createAt": "2024-02-14T07:49:37.000Z" as any,
                "isActive": true,
                "brandId": "850ec666-c8bb-4ca1-a867-3003d42e8db8",
                "manufactureId": "9d7d6ae3-1d93-438c-9035-4db59fc84cf5",
                "userId": "44d49ea4-1721-4ee5-a149-54f02cd612d0",
                "manufacturer": {
                    "id": "9d7d6ae3-1d93-438c-9035-4db59fc84cf5",
                    "manufactureName": "Việt Nam"
                },
                "user": {
                    "id": "44d49ea4-1721-4ee5-a149-54f02cd612d0",
                    "name": "Hoang Nhung1"
                },
                "brand": {
                    "id": "850ec666-c8bb-4ca1-a867-3003d42e8db8",
                    "brandName": "Gucci"
                },
                "item": [
                    {
                        "id": "644271cb-cc4d-4a4a-88c9-535228fb2c91",
                        "image": "http://res.cloudinary.com/dxzsokdkd/image/upload/v1707896976/product/hnfwllawoyw5rx4c3ulr.webp",
                        "productId": "d413fa50-5bea-4483-a7ff-d475391c8a3e"
                    },
                    {
                        "id": "66443e4f-6022-4b2e-87cc-83f6202baf5f",
                        "image": "http://res.cloudinary.com/dxzsokdkd/image/upload/v1707896977/product/gryou1jf0xhor5rhlq2m.webp",
                        "productId": "d413fa50-5bea-4483-a7ff-d475391c8a3e"
                    },
                    {
                        "id": "08fca2ea-456f-414c-b53e-293332fd75de",
                        "createAt": "2024-02-14T07:49:37.000Z" as any,
                        "isActive": true,
                        "image": "http://res.cloudinary.com/dxzsokdkd/image/upload/v1707896974/product/fgnpvx3eqv5ihedt6zdu.webp",
                        "productId": "08fca2ea-456f-414c-b53e-293332fd75de",
                        "priceOut": 20,
                        "quantity": 10,
                        "productAttribute": [
                            {
                                "id": "862afbd8-bd45-4b42-adb5-8a6292a1c2de",
                                "name": "size",
                                "value": "m",
                                "isActive": true
                            }
                        ]
                    }
                ]
            }
        ]
        const mockTotal = 20;

        jest.spyOn(productService, 'getAllProduct')
            .mockResolvedValueOnce({ results: mockResults, total: mockTotal, pageTotal: mockTotal })
        // Call the function
        const result = await productService.getAllProduct(mockPaginationDTO);
        // Assertions
        expect(result.results).toEqual(mockResults);
        expect(result.total).toEqual(mockTotal);
    });


});

// beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//         imports: [
//             TypeOrmModule.forFeature([
//                 ProductInventory,
//                 Product,
//                 Manufacturer,
//                 Brand,
//                 User,
//                 ProductItem
//             ]),
//             ProductItemModule,
//             ProductAttributeModule,
//             ProductInventoryModule,
//             StorageModule
//         ],
//         providers: [ProductService, ProductRepository],
//     }).compile();

//     productService = app.get<ProductService>(ProductService);
// });

// describe('getAllProduct', () => {
//     it('should return paginated products', async () => {
//         // Mock data and dependencies
//         const mockPaginationDTO = { limit: 10, page: 1 };
//         const mockResults: any = [
//             {
//                 "id": "d413fa50-5bea-4483-a7ff-d475391c8a3e",
//                 "productName": "booking",
//                 "desc": "story book 1",
//                 "createAt": "2024-02-14T07:49:37.000Z",
//                 "isActive": true,
//                 "brandId": "850ec666-c8bb-4ca1-a867-3003d42e8db8",
//                 "manufactureId": "9d7d6ae3-1d93-438c-9035-4db59fc84cf5",
//                 "userId": "44d49ea4-1721-4ee5-a149-54f02cd612d0",
//                 "manufacture": {
//                     "id": "9d7d6ae3-1d93-438c-9035-4db59fc84cf5",
//                     "manufactureName": "Việt Nam"
//                 },
//                 "user": {
//                     "id": "44d49ea4-1721-4ee5-a149-54f02cd612d0",
//                     "name": "Hoang Nhung1"
//                 },
//                 "brand": {
//                     "id": "850ec666-c8bb-4ca1-a867-3003d42e8db8",
//                     "brandName": "Gucci"
//                 },
//                 "item": [
//                     {
//                         "id": "644271cb-cc4d-4a4a-88c9-535228fb2c91",
//                         "image": "http://res.cloudinary.com/dxzsokdkd/image/upload/v1707896976/product/hnfwllawoyw5rx4c3ulr.webp",
//                         "productId": "d413fa50-5bea-4483-a7ff-d475391c8a3e"
//                     },
//                     {
//                         "id": "66443e4f-6022-4b2e-87cc-83f6202baf5f",
//                         "image": "http://res.cloudinary.com/dxzsokdkd/image/upload/v1707896977/product/gryou1jf0xhor5rhlq2m.webp",
//                         "productId": "d413fa50-5bea-4483-a7ff-d475391c8a3e"
//                     },
//                     {
//                         "id": "08fca2ea-456f-414c-b53e-293332fd75de",
//                         "createAt": "2024-02-14T07:49:37.000Z",
//                         "isActive": true,
//                         "image": "http://res.cloudinary.com/dxzsokdkd/image/upload/v1707896974/product/fgnpvx3eqv5ihedt6zdu.webp",
//                         "productId": "08fca2ea-456f-414c-b53e-293332fd75de",
//                         "priceOut": 20,
//                         "quantity": 10,
//                         "productAttribute": [
//                             {
//                                 "id": "862afbd8-bd45-4b42-adb5-8a6292a1c2de",
//                                 "name": "size",
//                                 "value": "m",
//                                 "isActive": true
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//         const mockTotal = 20;

//         // Mock the repository method directly
//         // jest.spyOn(productRepository, 'getAllProduct').mockResolvedValueOnce(mockProductRepositoryResponse);
//         // jest.spyOn(productService.getProductRepository(), 'getAllProduct').mockResolvedValueOnce({ results: mockResults, total: mockTotal });

//         // Call the function
//         // const result = await productService.getAllProduct(mockPaginationDTO);

//         // // Assertions
//         // expect(result.results).toEqual(mockResults);
//         // expect(result.total).toEqual(mockTotal);
//     });
// });
