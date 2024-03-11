import BaseEntities from "@base/base.entity";
import { Product } from "@models/product/entities/product.entity";
import { UserRole } from "@models/user_role/entities/user_role.entity";
import { EGender } from "@shared/constant";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntities {

    @Expose()
    @IsNotEmpty()
    @Column({ name: 'user_name', nullable: false, unique: true })
    username: string;


    @IsNotEmpty()
    @IsStrongPassword()
    @Column({ nullable: false })
    password: string;

    @Expose()
    @IsNotEmpty()
    @Index()
    @Column({ name: 'first_name' })
    firstName: string;

    @Expose()
    @IsNotEmpty()
    @Index()
    @Column({ name: 'last_name' })
    lastName: string;

    @Expose()
    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    @Column({ nullable: false })
    email: string

    @Expose()
    @IsEnum(EGender)
    @Column({ nullable: true })
    gender: EGender;

    @IsOptional()
    @Column({ name: 'refresh_token', nullable: true })
    refreshToken: string;

    @Expose()
    @OneToMany(() => UserRole, userRole => userRole.user)
    userRole: UserRole[]

    @OneToMany(() => Product, product => product.user)
    product: Product[]

    constructor(partial?: Partial<User>) {
        super();
        Object.assign(this, partial);
    }
}
