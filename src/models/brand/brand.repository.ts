import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository/base.repository";
import { Brand } from "./entities/brand.entity";
import { DataSource } from "typeorm";

@Injectable()
export class BrandRepository extends BaseRepository<Brand>{
    constructor(dataSource: DataSource) {
        super(dataSource)
    }
}