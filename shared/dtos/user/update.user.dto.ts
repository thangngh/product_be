import { EGender, VALIDATE_MESSAGE } from "@shared/constant";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class UpdateUserBodyDTO {

    @IsNotEmpty()
    @MaxLength(50, { message: VALIDATE_MESSAGE.TO_LONG })
    @IsEmail()
    public email!: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public firstName!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public lastName!: string;

    @IsNotEmpty()
    public phoneNumber!: string;

    @IsEnum(EGender)
    @IsNotEmpty()
    public gender!: EGender;
}