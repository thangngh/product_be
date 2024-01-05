import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository/base.repository";
import { UserRole } from "./entities/user_role.entity";
import { DataSource } from "typeorm";
import { CreateUserRoleBodyDTO } from "@shared/dtos/user_role/create.user_role.dto";

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRole> {

    constructor(public dataSource: DataSource) {
        super(dataSource)
    }

    createUserRole(body: CreateUserRoleBodyDTO[]) {
        const response = body.map(({ userId, roleId }) => this.create({ userId, roleId }))

        return this.save(response)
    }


}