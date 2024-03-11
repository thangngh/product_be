import { ApiProperty } from "@nestjs/swagger";
import { METHOD } from "@shared/constant";
import { SignupDTO } from "@shared/dtos/auth/sign_up.dto";
import { DTO } from "@shared/dtos/base.dto";
import { IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";

export class CreateProductAttributeBodyDTO {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(10)
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 100)
    value: string

    @ApiProperty()
    @IsNotEmpty()
    productInventoryId: string;
}

export class CreateProductAttributeResponseDTO {

}

export class CreateProductAttributeDTO extends DTO {
    public static url = '/create';
    public readonly url: string = SignupDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass = CreateProductAttributeResponseDTO;

    public bodyDTO: undefined;
    public paramDTO: undefined;
    public queryDTO: undefined;
}