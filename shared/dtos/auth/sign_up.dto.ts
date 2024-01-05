import { METHOD, VALIDATE_MESSAGE, strongPassword } from "@shared/constant";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength } from "class-validator";
import { DTO, ResponseDTO } from "../base.dto";
import { User } from "src/models/user/entities/user.entity";
import { UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "@shared/interceptors/serialize.interceptor";

export class SignUpBodyDTO {

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public username!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    @Matches(strongPassword, { message: VALIDATE_MESSAGE.NOT_MATCH })
    public password!: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public email!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public firstName!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public lastName!: string;
}

@UseInterceptors(SerializeInterceptor<User>)
export class SignupResponseDTO extends ResponseDTO<User> {

    @IsString()
    @IsNotEmpty()
    public accessToken!: string;
}

export class SignupDTO extends DTO {
    public static url = '/sign-up';
    public readonly url: string = SignupDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass = SignupResponseDTO;

    public bodyDTO: SignUpBodyDTO;
    public paramDTO: undefined;
    public queryDTO: undefined;
}
