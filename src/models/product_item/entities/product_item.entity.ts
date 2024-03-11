import { Product } from "@models/product/entities/product.entity";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductItem extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsOptional()
    @Column({ nullable: true })
    image: string;

    @IsOptional()
    @Column({ nullable: true })
    video: string;

    @IsNotEmpty()
    @IsString()
    @Column({ name: 'product_id', nullable: false })
    productId: string;

    @ManyToOne(() => Product, product => product.productItem)
    @JoinColumn({ name: 'product_id' })
    product: Product[]
}