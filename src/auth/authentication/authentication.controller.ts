import { Body, Controller, Post, Request, Res, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignUpBodyDTO, SignupDTO, SignupResponseDTO } from "@shared/dtos/auth/sign_up.dto";
import { Response } from "express";
import { RefreshTokenDTO } from "@shared/dtos/auth/refresh_token.dto";
import { authUser } from "@shared/decorators/auth.decorator";
import { User } from "src/models/user/entities/user.entity";
import { cookie } from "@shared/decorators/cookie.decorator";
import { RefreshTokenGuard } from "./guards/refresh_token.guard";

@Controller("auth")
export class AuthenticationController {
    constructor(
        protected readonly authenticationService: AuthenticationService
    ) { }

    @Post(SignupDTO.url)
    register(@Body() body: SignUpBodyDTO, @Res() res: Response) {
        return this.authenticationService.register(body, res)
    }

    @UseGuards(RefreshTokenGuard)
    @Post(RefreshTokenDTO.url)
    refreshToken(@Request() res) {
    }
}