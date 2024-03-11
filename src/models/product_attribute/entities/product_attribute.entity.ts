import BaseEntities from "@base/base.entity";
import { ProductInventory } from "@models/product_inventory/entities/product_inventory.entity";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ProductAttribute extends BaseEntities {

    @IsNotEmpty()
    @Column({ name: 'attribute_name', nullable: false })
    name: string

    @IsNotEmpty()
    @Column({ name: 'attribute_value', nullable: false })
    value: string

    @IsNotEmpty()
    @Column({ name: 'product_inventory_id', nullable: false })
    productInventoryId: string;

    @ManyToOne(() => ProductInventory, productInventory => productInventory.productAttribute)
    @JoinColumn({ name: 'product_inventory_id' })
    productInventory: ProductInventory[]
}