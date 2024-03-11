import { EnvModule } from "@config/env/env.modules";
import { Module } from "@nestjs/common";
import { redisClientFactory } from "./redis_client.factory";
import { RedisRepository } from "./redis.repository";
import { RedisService } from "./redis.service";

@Module({
    imports: [
        EnvModule
    ],
    providers: [redisClientFactory, RedisRepository, RedisService]
})
export class RedisModule { }