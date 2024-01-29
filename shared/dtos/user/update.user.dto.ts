import { ApiProperty } from "@nestjs/swagger";
import { EGender, VALIDATE_MESSAGE } from "@shared/constant";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class UpdateUserBodyDTO {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50, { message: VALIDATE_MESSAGE.TO_LONG })
    @IsEmail()
    public email!: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public firstName!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public lastName!: string;

    @ApiProperty()
    @IsNotEmpty()
    public phoneNumber!: string;

    @ApiProperty()
    @IsEnum(EGender)
    @IsNotEmpty()
    public gender!: EGender;
}