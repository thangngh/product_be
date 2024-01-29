import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, MaxLength } from "class-validator";

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