import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CreateProductAttributeBodyDTO } from "../product_attribute/create.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductInventoryBodyDTO {

    @ApiProperty()
    @IsOptional()
    public image: string;

    @ApiProperty()
    @IsNotEmpty()
    public productId!: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public priceIn!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public priceOut!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public quantity!: number;

}

export class CreateProductInventoryWithAttributeBodyDTO extends CreateProductInventoryBodyDTO {
    @ApiProperty({ type: () => [CreateProductAttributeBodyDTO] })
    @IsOptional()
    @Type(() => CreateProductAttributeBodyDTO)
    public bodyProductAttribute: CreateProductAttributeBodyDTO[]

}