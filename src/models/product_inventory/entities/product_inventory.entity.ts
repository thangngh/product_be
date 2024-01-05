import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import BaseEntities from "src/base/base.entity";
import { Product } from "src/models/product/entities/product.entity";
import { ProductAttribute } from "src/models/product_attribute/entities/product_attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class ProductInventory extends BaseEntities {

    @IsOptional()
    @Column({ nullable: true })
    image: string;

    @IsNotEmpty()
    @IsString()
    @Column({ name: 'product_id', nullable: false })
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @Column({ name: 'price_in', nullable: false })
    priceIn: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ name: 'price_out', nullable: false })
    priceOut: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ nullable: false, default: 0 })
    quantity: number;

    @ManyToOne(() => Product, product => product.productInventory)
    @JoinColumn({ name: 'product_id' })
    product: Product

    @OneToMany(() => ProductAttribute, productAttribute => productAttribute.productInventory)
    productAttribute: ProductAttribute[]
}