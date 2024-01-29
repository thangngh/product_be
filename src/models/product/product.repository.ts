import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductBodyDTO } from "@shared/dtos/product/create.dto";

@Injectable()
export class ProductRepository extends Repository<Product> {

    constructor(public dataSource: DataSource) {
        super(Product, dataSource.createEntityManager())
    }


    createProduct(userId: string, body: CreateProductBodyDTO) {
        const product = this.save({
            ...body,
            userId
        })

        return product;
    }

}