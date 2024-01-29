import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { DTO } from "../base.dto";
import { SignupDTO } from "../auth/sign_up.dto";
import { METHOD } from "@shared/constant";
import { ApiBody, ApiProperty } from "@nestjs/swagger";

export class CreateProductBodyDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    productName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(5, 100)
    desc: string;

    @ApiProperty()
    @IsOptional()
    brandId: string;

    @ApiProperty()
    @IsOptional()
    manufactureId: string;
}

export class CreateProductResponseDTO {

}

export class CreateProductDTO extends DTO {
    public static url = '/create';
    public readonly url: string = SignupDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass = CreateProductResponseDTO;

    public bodyDTO: undefined;
    public paramDTO: undefined;
    public queryDTO: undefined;
}
