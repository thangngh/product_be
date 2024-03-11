import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductInventory } from "./entities/product_inventory.entity";
import { CreateProductInventoryBodyDTO } from "@shared/dtos/product/product_inventory/create.dto";

@Injectable()
export class ProductInventoryRepository extends Repository<ProductInventory> {

    constructor(public dataSource: DataSource) {
        super(ProductInventory, dataSource.createEntityManager())
    }

    saveProductInventory(body: CreateProductInventoryBodyDTO[]) {
        return this.save(body)
    }


}