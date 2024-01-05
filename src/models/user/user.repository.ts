import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository/base.repository";
import { User } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateUserBodyDTO } from "@shared/dtos/user/create.user.dto";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(public dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }

    findUserById(id: string) {
        return this.findOne({
            where: { id }
        })
    }

    findUserByUsername(username: string) {
        return this.findOneBy({ username })
    }

    findUserByEmail(email: string) {
        return this.findOneBy({ email })
    }

    saveUser(body: CreateUserBodyDTO) {
        return this.save({ ...body })
    }

    saveRefreshToken(userId: string, refreshToken: string) {
        return this.createQueryBuilder("user")
            .update()
            .set({
                refreshToken
            })
            .where("user.id = :id", { id: userId })
            .execute()
    }
} 