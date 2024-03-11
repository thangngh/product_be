import { Injectable } from '@nestjs/common';
import { ProductItemRepository } from './product_item.repository';
import { CreateProductItemBodyDTO } from '@shared/dtos/product/product_item/create.dto';

@Injectable()
export class ProductItemService {

    constructor(
        private readonly productItemRepository: ProductItemRepository
    ) { }

    async create(body: CreateProductItemBodyDTO[]) {

        const productItem = body.map((item) => this.productItemRepository.create(item))
        return await this.productItemRepository.saveProductItem(productItem)
    }
}
