import { Injectable } from '@nestjs/common';
import { ProductInventoryRepository } from './product_inventory.repository';
import { CreateProductInventoryBodyDTO } from '@shared/dtos/product/product_inventory/create.dto';

@Injectable()
export class ProductInventoryService {

    constructor(
        private readonly productInventoryRepository: ProductInventoryRepository
    ) { }

    async create(body: CreateProductInventoryBodyDTO[]) {
        const productInventory = body.map((item) =>
            this.productInventoryRepository.create(item)
        )

        return await this.productInventoryRepository.saveProductInventory(productInventory)
    }
}
