import { IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "src/models/user_role/entities/user_role.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Role extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsNotEmpty()
    @Column({ name: 'role_name' })
    roleName: string;

    @IsOptional()
    @Column({ nullable: true })
    description: string;

    @Column()
    priority: number

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRole: UserRole[]

    constructor(partial?: Partial<Role>) {
        super();
        Object.assign(this, partial);
    }
}