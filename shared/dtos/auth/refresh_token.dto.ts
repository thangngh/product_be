import { METHOD } from "@shared/constant";
import { DTO } from "../base.dto";
import { IsJWT, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenBodyDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsJWT()
    rfToken: string;
}

export class RefreshTokenDTO extends DTO {
    public static url = '/refresh-token';
    public readonly url: string = RefreshTokenDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass: RefreshTokenBodyDTO;

    public bodyDTO: undefined;
    public paramDTO: undefined;
    public queryDTO: undefined;
}