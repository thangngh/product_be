import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import 'dotenv/config';
import { JWTPayload } from '../jwt.payload';
import { AuthenticationService } from '../authentication.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {

	constructor(private readonly authService: AuthenticationService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: JWTPayload) {
		return await this.authService.verifyToken(payload);
	}
}