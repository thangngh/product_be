import { EnvServiceConfig } from "@config/env/env-config.service";
import { BadRequestException, Injectable, UnauthorizedException, Res, ForbiddenException } from "@nestjs/common";
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
import { RefreshTokenBodyDTO } from "@shared/dtos/auth/refresh_token.dto";
import { I18nService } from "nestjs-i18n";
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly userRoleService: UserRoleService,
        private readonly jwtService: JwtService,
        private readonly envConfig: EnvServiceConfig,
        private readonly i18Service: I18nService
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

        return { accessToken, accessTokenExpired: this.envConfig.JWT_SECRET_EXPIRES(), refreshToken, refreshTokenExpired: this.envConfig.JWT_REFRESH_SECRET_EXPIRES() };
    }

    async verifyToken(payload: JWTPayload) {
        try {
            const { userId } = payload;
            const user = await this.userService.findUserByField("id", userId)

            return user;
        } catch (error) {
            throw new UnauthorizedException(
                SYSTEM_CODE.UNAUTHORIZED
            )
        }
    }

    async register(body: SignUpBodyDTO, @Res() res: Response) {
        const { username, password, email } = body;

        const existUsername = await this.userService.findUserByField("username", username)
        if (!!existUsername) {
            throw new BadRequestException(SYSTEM_CODE.USER_ALREADY_EXISTS)
        }

        const existEmail = await this.userService.findUserByField("email", email)
        if (!!existEmail) {
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

        const getInitRole = await this.roleService.setInitRole()

        this.userRoleService.createUserRole([{ userId: saveUser.id, roleId: getInitRole }])

        res.cookie("rfToken", { refreshToken }, { httpOnly: true, secure: true, sameSite: 'strict' })

        res.json({
            accessToken
        })
    }

    async saltToken(token: string) {
        return await hashValue(token)
    }

    async refreshToken(body: RefreshTokenBodyDTO, @Res() res: Response) {

        const { rfToken } = body
        const { userId } = this.jwtService.decode(rfToken);
        const user = await this.userService.findUserByField("id", userId)

        if (!user) {
            throw new BadRequestException(SYSTEM_CODE.FORBIDDEN)
        }
        const isMatch = await validateHash(user.refreshToken, rfToken);

        if (!isMatch) {
            throw new BadRequestException(SYSTEM_CODE.FORBIDDEN);
        }

        const { accessToken, refreshToken } = await this.signToken(user.username, userId)

        const saltRefreshToken = await this.saltToken(refreshToken)

        await this.userService.updateRefreshToken(user, saltRefreshToken)

        res.cookie("rfToken", refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })

        res.json(

            {
                message: this.i18Service.t("exception.BAD_REQUEST"),
                accessToken
            }
        )
    }

    async login(body: LoginBodyDTO, @Res() res: Response) {
        const { username, password } = body;

        const validateUsername = await this.userService.findUserByField("username", username)

        if (!validateUsername) {
            throw new BadRequestException(SYSTEM_CODE.USERNAME_OR_PASSWORD_INVALID)
        }

        const getUser = await this.userService.findUserByField("username", username)

        const comparePassword = await validateHash(getUser.password, password)

        if (!comparePassword) {
            throw new BadRequestException(SYSTEM_CODE.USERNAME_OR_PASSWORD_INVALID)
        }

        if (!getUser.isActive) {
            throw new ForbiddenException(SYSTEM_CODE.ACCOUNT_LOCKED)
        }

        const { accessToken, refreshToken, accessTokenExpired } = await this.signToken(getUser.username, getUser.id)
        const saltRefreshToken = await this.saltToken(refreshToken)

        this.userService.updateRefreshToken(getUser, saltRefreshToken)

        res.cookie("rfToken", refreshToken, { httpOnly: true, secure: true })

        res.json({
            accessToken,
            accessTokenExpired: parseInt(accessTokenExpired) + Date.now()
        })
    }
}