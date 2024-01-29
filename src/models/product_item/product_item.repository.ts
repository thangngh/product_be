import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductItem } from "./entities/product_item.entity";

@Injectable()
export class ProductItemRepository extends Repository<ProductItem> {

    constructor(public dataSource: DataSource) {
        super(ProductItem, dataSource.createEntityManager())
    }




}