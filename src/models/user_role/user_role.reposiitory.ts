import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository/base.repository";
import { UserRole } from "./entities/user_role.entity";
import { DataSource, Repository } from "typeorm";
import { CreateUserRoleBodyDTO } from "@shared/dtos/user_role/create.user_role.dto";

@Injectable()
export class UserRoleRepository extends Repository<UserRole> {

    constructor(public dataSource: DataSource) {
        super(UserRole, dataSource.createEntityManager())
    }

    createUserRole(body: CreateUserRoleBodyDTO[]) {
        const response = body.map(({ userId, roleId }) => this.create({ userId, roleId }))

        return this.save(response)
    }


}