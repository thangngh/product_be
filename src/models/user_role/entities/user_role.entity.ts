import BaseEntities from "@base/base.entity";
import Role from "@models/role/entities/role.entity";
import { User } from "@models/user/entities/user.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class UserRole extends BaseEntities {

    @IsNotEmpty()
    @IsString()
    @Column({ name: 'user_id', nullable: false })
    userId: string;

    @IsNotEmpty()
    @IsString()
    @Column({ name: 'role_id', nullable: false })
    roleId: string;

    @ManyToOne(() => User, user => user.userRole)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Role, role => role.userRole)
    @JoinColumn({ name: 'role_id' })
    role: Role
}