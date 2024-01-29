import { Injectable } from '@nestjs/common';
import { ProductAttributeRepository } from './product_attribute.repository';
import { CreateProductAttributeBodyDTO } from '@shared/dtos/product/product_attribute/create.dto';

@Injectable()
export class ProductAttributeService {

    constructor(
        private readonly productAttributeRepository: ProductAttributeRepository
    ) { }

    async create(body: CreateProductAttributeBodyDTO[]) {
        const productAttribute = body.map((item) =>
            this.productAttributeRepository.create(item)
        )

        return await this.productAttributeRepository.save(productAttribute)
    }
}
