import { Injectable } from "@nestjs/common";
import Role from "./entities/role.entity";
import { DataSource, Repository } from "typeorm";
import { ERole } from "@shared/constant";

@Injectable()
export default class RoleRepository extends Repository<Role> {
    constructor(dataSource: DataSource) {
        super(Role, dataSource.createEntityManager())
    }

    findRoleById(id: string) {
        return this.findOneBy({ id })
    }

    findRoleByName(name: ERole) {
        return this.findOneBy({ roleName: ERole[name] })
    }
}