import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import BaseEntities from "src/base/base.entity";
import { Brand } from "src/models/brand/entities/brand.entity";
import { Manufacturer } from "src/models/manufacturer/entities/manufacturer.entity";
import { ProductInventory } from "src/models/product_inventory/entities/product_inventory.entity";
import { ProductItem } from "src/models/product_item/entities/product_item.entity";
import { User } from "src/models/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Product extends BaseEntities {

    @IsString()
    @IsNotEmpty()
    @Column({ name: 'product_name', nullable: false })
    productName: string;

    @IsNotEmpty()
    @Column({ name: 'description', nullable: false })
    desc: string;

    @IsOptional()
    @Column({ name: 'brand_id', nullable: true, type: 'text' })
    brandId: string;

    @IsOptional()
    @Column({ name: 'manufacturer_id', nullable: true, type: 'text' })
    manufactureId: string;

    @IsNotEmpty()
    @Column({ name: 'user_id', nullable: false })
    userId: string;

    @OneToMany(() => ProductItem, productItem => productItem.product)
    productItem: ProductItem[]

    @OneToMany(() => ProductInventory, productInventory => productInventory.product)
    productInventory: ProductInventory[]

    @ManyToOne(() => Brand, brand => brand.product)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand

    @ManyToOne(() => User, user => user.product)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Manufacturer, manufacturer => manufacturer.product)
    @JoinColumn({ name: 'manufacturer_id' })
    manufacturer: Manufacturer
}