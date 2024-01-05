import { EGender, VALIDATE_MESSAGE } from "@shared/constant";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateUserBodyDTO {

    @IsNotEmpty()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public username!: string;

    @IsNotEmpty()
    public password!: string;

    @IsNotEmpty()
    public firstName!: string;

    @IsNotEmpty()
    public lastName!: string;

    @IsOptional()
    public phoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    public email!: string;

    @IsOptional()
    @IsEnum(EGender)
    public gender!: EGender;

    @IsOptional()
    public refreshToken: string;
}