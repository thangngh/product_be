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

    findUserByField<K extends keyof User>(field: K, value: User[K], relations?: Array<keyof User>) {
        return this.findOne({
            where: { [field]: value },
            relations: relations?.length > 0 ? relations : []
        });
    }

    saveUser(body: CreateUserBodyDTO) {
        return this.save({ ...body })
    }

    updateStandAloneField<K extends keyof User>(userId: string, field: K, value: User[K]) {
        return this.createQueryBuilder("user")
            .update()
            .set({
                [field]: value
            })
            .where("user.id = :id", { id: userId })
            .execute()
    }

    // saveRefreshToken(userId: string, refreshToken: string) {
    //     return this.createQueryBuilder("user")
    //         .update()
    //         .set({
    //             refreshToken
    //         })
    //         .where("user.id = :id", { id: userId })
    //         .execute()
    // }
} 