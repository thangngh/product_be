import { Module } from "@nestjs/common";
import { RoleModule } from "src/models/role/role.module";
import { UserModule } from "src/models/user/user.module";
import { UserRoleModule } from "src/models/user_role/user_role.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@config/env/env.modules";
import { EnvServiceConfig } from "@config/env/env-config.service";
import { AuthController } from "./auth.controller";
import { RefreshTokenStrategy } from "./strategies/refresh_token.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { I18nModule } from "nestjs-i18n";
import { LocalesModule } from "@config/locales/locales.module";

@Module({
    imports: [
        EnvModule,
        UserModule,
        RoleModule,
        UserRoleModule,
        LocalesModule,
        JwtModule.registerAsync({
            imports: [EnvModule],
            useFactory: async (envConfigService: EnvServiceConfig) => ({
                secret: envConfigService.JWT_SECRET(),
                signOptions: { expiresIn: envConfigService.JWT_SECRET_EXPIRES() }
            }),
            inject: [EnvServiceConfig]
        })
    ],
    providers: [AuthService, RefreshTokenStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }