import { EnvServiceConfig } from "@config/env/env-config.service";
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export default class DatabaseConfigService implements TypeOrmOptionsFactory {

    constructor(
        public envConfig: EnvServiceConfig
    ) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.envConfig.DB_HOST(),
            port: this.envConfig.DB_PORT(),
            username: this.envConfig.DB_USER(),
            password: this.envConfig.DB_PASSWORD(),
            database: this.envConfig.DB_NAME(),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            autoLoadEntities: true,
        }
    }
}