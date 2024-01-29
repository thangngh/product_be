import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductInventory } from "./entities/product_inventory.entity";

@Injectable()
export class ProductInventoryRepository extends Repository<ProductInventory> {

    constructor(public dataSource: DataSource) {
        super(ProductInventory, dataSource.createEntityManager())
    }




}