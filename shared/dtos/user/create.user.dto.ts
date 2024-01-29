import { ApiProperty } from "@nestjs/swagger";
import { EGender, VALIDATE_MESSAGE } from "@shared/constant";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateUserBodyDTO {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public username!: string;

    @ApiProperty()
    @IsNotEmpty()
    public password!: string;

    @ApiProperty()
    @IsNotEmpty()
    public firstName!: string;

    @ApiProperty()
    @IsNotEmpty()
    public lastName!: string;

    @ApiProperty()
    @IsOptional()
    public phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public email!: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(EGender)
    public gender!: EGender;

    @ApiProperty()
    @IsOptional()
    public refreshToken: string;
}