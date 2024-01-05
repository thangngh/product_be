import { Module } from "@nestjs/common";
import { RoleModule } from "src/models/role/role.module";
import { UserModule } from "src/models/user/user.module";
import { UserRoleModule } from "src/models/user_role/user_role.module";
import { AuthenticationService } from "./authentication.service";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@config/env/env.modules";
import { EnvServiceConfig } from "@config/env/env-config.service";
import { AuthenticationController } from "./authentication.controller";
import { RefreshTokenStrategy } from "./strategies/refresh_token.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        EnvModule,
        UserModule,
        RoleModule,
        UserRoleModule,
        JwtModule.registerAsync({
            imports: [EnvModule],
            useFactory: async (envConfigService: EnvServiceConfig) => ({
                secret: envConfigService.JWT_SECRET(),
                signOptions: { expiresIn: envConfigService.JWT_SECRET_EXPIRES() }
            }),
            inject: [EnvServiceConfig]
        })
    ],
    providers: [AuthenticationService, RefreshTokenStrategy, JwtStrategy],
    controllers: [AuthenticationController],
    exports: [AuthenticationService]
})
export class AuthenticationModule { }