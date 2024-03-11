import { METHOD, VALIDATE_MESSAGE, strongEmail, strongPassword } from "@shared/constant";
import { IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";
import { DTO, ResponseDTO } from "../base.dto";
import { User } from "src/models/user/entities/user.entity";
import { UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "@shared/interceptors/serialize.interceptor";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpBodyDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: VALIDATE_MESSAGE.TO_LONG })
    public username!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(25, { message: VALIDATE_MESSAGE.TO_LONG })
    @Matches(strongPassword, { message: VALIDATE_MESSAGE.NOT_MATCH })
    public password!: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(25, { message: `Email ${VALIDATE_MESSAGE.TO_LONG}` })
    @Matches(strongEmail, { message: VALIDATE_MESSAGE.NOT_MATCH })
    public email!: string;

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
}

@UseInterceptors(SerializeInterceptor<User>)
export class SignupResponseDTO extends ResponseDTO<User> {

    @ApiProperty()
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
