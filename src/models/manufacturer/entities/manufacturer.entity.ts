import { Product } from "@models/product/entities/product.entity";
import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manufacturer extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsNotEmpty()
    @Column({ name: 'manufacturer_name', nullable: false })
    manufacturerName: string;

    @OneToMany(() => Product, product => product.manufacturer)
    product: Product[]

    constructor(partial?: Partial<Manufacturer>) {
        super();
        Object.assign(this, partial);
    }
}