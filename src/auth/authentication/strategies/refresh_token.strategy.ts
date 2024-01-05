// refresh-token.strategy.ts
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
    constructor(private readonly jwtService: JwtService) {
        super({
            jwtFromRequest: (req: Request) => {
                const cookieHeader = req.headers.cookie;

                console.log("header", cookieHeader)
                // const refreshToken = cookieHeader?.split(';')
                //   .find((cookie) => cookie.trim().startsWith('refreshToken='))
                //   ?.split('=')[1]
                //   .trim();
                // return refreshToken;
            },
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
        console.log("RefreshTokenStrategy constructor called");
    }

    async validate(req: Request, payload: any) {
        console.log("RefreshTokenStrategy validate called");

        // Extract the token from the Cookie header
        const cookieHeader = req.headers.cookie;
        const refreshToken = cookieHeader?.split(';')
            .find((cookie) => cookie.trim().startsWith('refreshToken='))
            ?.split('=')[1]
            .trim();

        return { ...payload, refreshToken };
    }
}
