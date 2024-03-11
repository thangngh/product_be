import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductItem } from "./entities/product_item.entity";
import { CreateProductItemBodyDTO } from "@shared/dtos/product/product_item/create.dto";

@Injectable()
export class ProductItemRepository extends Repository<ProductItem> {

    constructor(public dataSource: DataSource) {
        super(ProductItem, dataSource.createEntityManager())
    }


    saveProductItem(body: CreateProductItemBodyDTO[]) {
        return this.save(body)
    }

}