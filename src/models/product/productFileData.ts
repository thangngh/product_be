import { IsBase64, IsString } from "class-validator";

export class ProductFileData {
    @IsString()
    filename: string;

    @IsString()
    type: 'image' | 'video';

    @IsString()
    id: string;

    @IsBase64()
    base64Img: string;

    @IsString()
    fieldName: 'bodyProductItem' | 'bodyProductInventory'
}