import { UseInterceptors } from "@nestjs/common";
import { EGender } from "@shared/constant";
import { SerializeInterceptor } from "@shared/interceptors/serialize.interceptor";
import { Expose } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";
import BaseEntities from "src/base/base.entity";
import { Product } from "src/models/product/entities/product.entity";
import { UserRole } from "src/models/user_role/entities/user_role.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

@UseInterceptors(SerializeInterceptor<User>)
@Entity()
export class User extends BaseEntities {

    @IsNotEmpty()
    @Column({ name: 'user_name', nullable: false, unique: true })
    username: string;

    @Expose()
    @IsNotEmpty()
    @IsStrongPassword()
    @Column({ nullable: false })
    password: string;

    @IsNotEmpty()
    @Index()
    @Column({ name: 'first_name' })
    firstName: string;

    @IsNotEmpty()
    @Index()
    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ nullable: false })
    email: string

    @IsEnum(EGender)
    @Column({ nullable: true })
    gender: EGender;

    @IsOptional()
    @Column({ name: 'refresh_token', nullable: true })
    refreshToken: string;

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRole: UserRole[]

    @OneToMany(() => Product, product => product.user)
    product: Product[]

    constructor(partial?: Partial<User>) {
        super();
        Object.assign(this, partial);
    }
}
