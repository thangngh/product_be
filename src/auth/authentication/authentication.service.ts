import { EnvServiceConfig } from "@config/env/env-config.service";
import { BadRequestException, Injectable, UnauthorizedException, Res } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { RoleService } from "src/models/role/role.service";
import { UserService } from "src/models/user/user.service";
import { UserRoleService } from "src/models/user_role/user_role.service";
import { JWTPayload } from "./jwt.payload";
import { SYSTEM_CODE } from "@shared/constant";
import { SignUpBodyDTO, SignupResponseDTO } from "@shared/dtos/auth/sign_up.dto";
import { hashValue, validateHash } from "@shared/common/password";
import { Response } from "express";
import { LoginBodyDTO } from "@shared/dtos/auth/login.dto";
@Injectable()
export class AuthenticationService {
    constructor(
        protected readonly userService: UserService,
        protected readonly roleService: RoleService,
        protected readonly userRoleService: UserRoleService,
        protected readonly jwtService: JwtService,
        protected readonly envConfig: EnvServiceConfig
    ) { }


    async signToken(username: string, userId: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign({
                userId, username
            },
                {
                    secret: this.envConfig.JWT_SECRET(),
                    expiresIn: this.envConfig.JWT_SECRET_EXPIRES()
                }),
            this.jwtService.sign({
                userId, username
            },
                {
                    secret: this.envConfig.JWT_REFRESH_SECRET(),
                    expiresIn: this.envConfig.JWT_REFRESH_SECRET_EXPIRES()
                })
        ])

        return { accessToken, refreshToken };
    }

    async verifyToken(payload: JWTPayload) {
        const { userId } = payload;

        try {
            const user = await this.userService.findUserById(userId)

            return user;
        } catch (error) {
            throw new UnauthorizedException(
                SYSTEM_CODE.UNAUTHORIZED
            )
        }
    }

    async register(body: SignUpBodyDTO, @Res() res: Response) {
        const { username, password, email } = body;

        const existUsername = await this.userService.existUsername(username)

        if (existUsername) {
            throw new BadRequestException(SYSTEM_CODE.USER_ALREADY_EXISTS)
        }

        const existEmail = await this.userService.existEmail(email)

        if (existEmail) {
            throw new BadRequestException(SYSTEM_CODE.EMAIL_ALREADY_EXISTS)
        }

        const saltPassword = await hashValue(password);

        const saveUser = await this.userService.registerUser({ ...body, password: saltPassword })

        if (!saveUser) {
            throw new BadRequestException(SYSTEM_CODE.USERNAME_OR_PASSWORD_INVALID)
        }

        const { accessToken, refreshToken } = await this.signToken(username, saveUser.id)

        const saltRefreshToken = await hashValue(refreshToken);

        await this.userService.updateRefreshToken(saveUser, saltRefreshToken)

        res.cookie("rfToken", refreshToken, { httpOnly: true })

        res.json({
            accessToken
        })
    }

    async refreshToken(userId: string, refreshToken: string) {

        const user = await this.userService.findUserById(userId)

        if (user || !user['refresh_token']) {
            throw new BadRequestException(SYSTEM_CODE.FORBIDDEN)
        }

        const isMatch = await validateHash(user['refresh_token'], refreshToken);

        if (!isMatch) {
            throw new BadRequestException(SYSTEM_CODE.FORBIDDEN);
        }

        const { accessToken } = await this.signToken(userId, user.username)

        await this.userService.updateRefreshToken(user, refreshToken)

        return {
            accessToken
        }
    }

    async login(body: LoginBodyDTO) {
        const { username, password } = body;

        const validateUsername = await this.userService.existUsername(username)

        if (validateUsername) {
            throw new BadRequestException(SYSTEM_CODE.USERNAME_OR_PASSWORD_INVALID)
        }
    }
}