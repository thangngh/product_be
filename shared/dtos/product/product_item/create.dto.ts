import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductItemBodyDTO {
    @ApiProperty()
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsOptional()
    video: string;

    // @IsNotEmpty()
    // @IsString()
    // productId: string;
}