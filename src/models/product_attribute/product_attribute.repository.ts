import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductAttribute } from "./entities/product_attribute.entity";

@Injectable()
export class ProductAttributeRepository extends Repository<ProductAttribute> {

    constructor(public dataSource: DataSource) {
        super(ProductAttribute, dataSource.createEntityManager())
    }
}