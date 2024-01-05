import { Injectable } from "@nestjs/common";
import { BaseEntity, DataSource, Repository } from "typeorm";

@Injectable()
export class BaseRepository<T extends BaseEntity> extends Repository<T> {
    constructor(public dataSource: DataSource) {
        super(Repository<T>, dataSource.createEntityManager());
    }

}

