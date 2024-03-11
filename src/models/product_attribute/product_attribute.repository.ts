import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductAttribute } from "./entities/product_attribute.entity";
import { CreateProductAttributeBodyDTO } from "@shared/dtos/product/product_attribute/create.dto";

@Injectable()
export class ProductAttributeRepository extends Repository<ProductAttribute> {

    constructor(public dataSource: DataSource) {
        super(ProductAttribute, dataSource.createEntityManager())
    }

    saveProductAttribute(body: CreateProductAttributeBodyDTO[]) {
        return this.save(body)
    }
}