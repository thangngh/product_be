import { EnvServiceConfig } from '@config/env/env-config.service';
import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';
import "dotenv/config"
export const redisClientFactory: FactoryProvider<Redis> = {
    provide: 'RedisClient',
    useFactory: (envConfig: EnvServiceConfig) => {

        const redisInstance = new Redis({
            host: 'localhost',
            port: 6379,
            // password: ''
        });

        redisInstance.on('error', e => {
            throw new Error(`Redis connection failed: ${e}`);
        });

        return redisInstance;
    },
    inject: [EnvServiceConfig],
};