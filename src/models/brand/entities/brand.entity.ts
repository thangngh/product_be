import { Product } from "@models/product/entities/product.entity";
import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsNotEmpty()
    @Column({ name: 'brand_name', nullable: false })
    brandName: string;

    @OneToMany(() => Product, product => product.brand)
    product: Product[];

    constructor(partial?: Partial<Brand>) {
        super();
        Object.assign(this, partial);
    }
}
