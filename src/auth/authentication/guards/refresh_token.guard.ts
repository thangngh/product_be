import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { EnvServiceConfig } from "@config/env/env-config.service";
import { SYSTEM_CODE } from "@shared/constant";
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt_refresh')
    implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly envService: EnvServiceConfig,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { rfToken } = request.cookies

        try {

            const validate = await this.jwtService.verify(rfToken, { secret: this.envService.JWT_REFRESH_SECRET() })
            return validate && true;
        } catch (error) {
            throw new UnauthorizedException(SYSTEM_CODE.UNAUTHORIZED)
        }
    }
}