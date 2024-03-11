import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductBodyDTO } from "@shared/dtos/product/create.dto";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "@shared/pagination";

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

    async getAllProduct(limit: number = DEFAULT_SIZE, page: number = DEFAULT_PAGE, userId?: string) {
        const take = limit;
        const skip = (page - 1) * take;

        let query = this.createQueryBuilder("product")
            .leftJoinAndSelect("product.user", "user")
            .leftJoinAndSelect("product.brand", "brand")
            .leftJoinAndSelect("product.manufacturer", "manufacturer")
            .leftJoinAndSelect("product.productItem", "productItem")
            .leftJoinAndSelect("product.productInventory", "productInventory")
            .leftJoinAndSelect("productInventory.productAttribute", "productAttribute")
            .take(take)
            .skip(skip)
            .orderBy("product.createAt", "ASC")
        // .select(["product.id as id", "product.productName as productName", "product.createAt as createAt"])

        if (userId) {
            query = query.where("user.id = :userId", { userId });
        }

        const [results, total] = await Promise.all([query.getMany(), query.getCount()])
        return { results, total }
    }

}