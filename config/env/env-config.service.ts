import { Injectable, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SerializeInterceptor } from "@shared/interceptors/serialize.interceptor";
import { Expose, Transform, Type, plainToClass } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@UseInterceptors(SerializeInterceptor<ConfigService>)
@Injectable()
export class EnvServiceConfig {
    constructor(
        private readonly configService: ConfigService
    ) {
    }

    @Expose()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    API_PORT() {
        return this.configService.get<number>("API_PORT")
    }

    @Expose()
    @IsString()
    BASE_URL() {
        return this.configService.get<string>("BASE_URL")
    }


    @Expose()
    @IsString()
    DB_HOST() {
        return this.configService.get<string>("DB_HOST")
    }

    @Expose()
    @IsString()
    @Transform(({ value }) => parseInt(value))
    DB_PORT() {
        return this.configService.get<number>("DB_PORT")
    }

    @Expose()
    @IsString()
    DB_USER() {
        return this.configService.get<string>("DB_USER")
    }

    @Expose()
    @IsString()
    @Transform(({ value }) => parseInt(value))
    DB_PASSWORD() {
        return this.configService.get<string>("DB_PASSWORD") || ''
    }

    @Expose()
    @IsString()
    DB_NAME() {
        return this.configService.get<string>("DB_NAME")
    }

    //jwt
    @Expose()
    @IsString()
    JWT_SECRET() {
        return this.configService.get<string>("JWT_SECRET")
    }

    @Expose()
    @IsString()
    JWT_SECRET_EXPIRES() {
        return this.configService.get<string>("JWT_SECRET_EXPIRES")
    }

    @Expose()
    @IsString()
    JWT_REFRESH_SECRET() {
        return this.configService.get<string>("JWT_REFRESH_SECRET")
    }

    @Expose()
    @IsString()
    JWT_REFRESH_SECRET_EXPIRES() {
        return this.configService.get<string>("JWT_REFRESH_SECRET_EXPIRES")
    }

    @Expose()
    @IsString()
    CLOUDINARY_CLOUD_NAME() {
        return this.configService.get<string>("CLOUDINARY_CLOUD_NAME")
    }

    @Expose()
    @IsString()
    CLOUDINARY_API_KEY() {
        return this.configService.get<string>("CLOUDINARY_API_KEY")
    }

    @Expose()
    @IsString()
    CLOUDINARY_API_SECRET() {
        return this.configService.get<string>("CLOUDINARY_API_SECRET")
    }

    @IsString()
    REDIS_HOST() {
        return this.configService.get<string>("REDIS_HOST")
    }

    @IsString()
    REDIS_PASSWORD() {
        return this.configService.get<string>("REDIS_PASSWORD")
    }

    @IsNumber()
    REDIS_PORT() {
        return this.configService.get<number>("REDIS_PORT")
    }
}

