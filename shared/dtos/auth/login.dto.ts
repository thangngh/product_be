import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { DTO } from "../base.dto";
import { METHOD } from "@shared/constant";

export class LoginResponseDTO {
    @IsString()
    @IsNotEmpty()
    public accessToken!: string;
}

export class LoginBodyDTO {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    public username!: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    public password!: string;
}

export class LoginDTO extends DTO {
    public static url = '/login';
    public readonly url: string = LoginDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass = LoginResponseDTO;

    public bodyDTO: LoginBodyDTO;
    public paramDTO: undefined;
    public queryDTO: undefined;
}
