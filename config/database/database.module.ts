import { EnvModule } from "@config/env/env.modules";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseConfigService from "./database-config.service";

@Module({
    imports: [
        EnvModule,
        TypeOrmModule.forRootAsync({
            imports: [EnvModule],
            useClass: DatabaseConfigService,
        }),
    ],
    providers: [DatabaseConfigService],
    exports: [TypeOrmModule]

})
export class DatabaseModule { }