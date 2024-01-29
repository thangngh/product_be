import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import 'dotenv/config';
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt';
import { EnvServiceConfig } from '@config/env/env-config.service';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
    constructor(
        protected readonly jwtService: JwtService,
        protected readonly envConfig: EnvServiceConfig
    ) {
        super({
            jwtFromRequest: (req: Request) => {
                const cookieHeader = req.headers.cookie;
                const refreshToken = cookieHeader?.split(';')
                    .find((cookie) => cookie.trim().startsWith('rfToken='))
                    ?.split('=')[1]
                    .trim();
                return refreshToken;
            },
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request) {
        const cookieHeader = req.headers.cookie;
        const refreshToken = cookieHeader?.split(';')
            .find((cookie) => cookie.trim().startsWith('rfToken='))
            ?.split('=')[1]
            .trim();

        return { refreshToken };
    }
}
