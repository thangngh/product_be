import { Module } from "@nestjs/common";
import { EnvServiceConfig } from "./env-config.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers: [EnvServiceConfig],
    exports: [EnvServiceConfig]
})
export class EnvModule { }