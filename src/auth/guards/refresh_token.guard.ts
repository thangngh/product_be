import { EnvServiceConfig } from "@config/env/env-config.service";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

import { Request } from 'express'
import { Observable } from "rxjs";
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt_refresh') implements CanActivate {

    constructor(protected readonly jwtService: JwtService, protected readonly envConfig: EnvServiceConfig) {
        super()
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        this.extractTokenFromHeaderCookie(request)

        return super.canActivate(context);
    }

    private extractTokenFromHeaderCookie(request: Request): string | undefined {

        const { rfToken } = request.cookies
        try {
            const token = this.jwtService.verify(rfToken, { secret: this.envConfig.JWT_REFRESH_SECRET() })
            return token
        } catch (error) {
            throw new UnauthorizedException()
        }

    }
}
