import { Inject, Injectable } from "@nestjs/common";
import { RedisRepository } from "./redis.repository";

const oneDayInSeconds = 60 * 60 * 24;
const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class RedisService {
    constructor(
        @Inject(RedisRepository) private readonly redisRepository: RedisRepository
    ) { }

    async saveResetToken(userId: string, token: string): Promise<void> {
        // Expiry is set to 10 minutes
        await this.redisRepository.setWithExpiry(
            'RESET_TOKEN',
            token,
            userId,
            tenMinutesInSeconds,
        );
    }

    async getResetToken(token: string): Promise<string | null> {
        return await this.redisRepository.get('RESET_TOKEN', token);
    }
}