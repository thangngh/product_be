import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpBodyDTO, SignupDTO } from "@shared/dtos/auth/sign_up.dto";
import { Response } from "express";
import { RefreshTokenBodyDTO, RefreshTokenDTO } from "@shared/dtos/auth/refresh_token.dto";
import { cookie } from "@shared/decorators/cookie.decorator";
import { RefreshTokenGuard } from "./guards/refresh_token.guard";
import { LoginBodyDTO, LoginDTO } from "@shared/dtos/auth/login.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post(SignupDTO.url)
    register(@Body() body: SignUpBodyDTO, @Res() res: Response) {
        return this.authService.register(body, res)
    }

    @Post(LoginDTO.url)
    login(@Body() body: LoginBodyDTO, @Res() res: Response) {
        return this.authService.login(body, res)
    }

    @UseGuards(RefreshTokenGuard)
    @Post(RefreshTokenDTO.url)
    refreshToken(@cookie() cookie: RefreshTokenBodyDTO, @Res() res: Response) {
        return this.authService.refreshToken(cookie, res)
    }
}