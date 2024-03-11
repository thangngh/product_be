import { METHOD } from "@shared/constant";
import { DTO } from "../base.dto";
import { PaginationDTO } from "@shared/pagination/dto/paginationQuery-dto";
import { GetBrandResponse } from "../brand/get-brand.dto";
import { GetManufactureResponse } from "../manufacture/get-manufacture.dto";
import { GetNameUserResponse } from "../user/get-user.dto";
import { GetProductAttributeResponse } from "./product_attribute/get-product-attribute.dto";

export class GetAllProductResponse {
    public id: string;
    public createAt: Date;
    public isActive: boolean;
    public productName: string;
    public desc: string;
    public brandId: string;
    public manufactureId: string;
    public userId: string;
    public user: GetNameUserResponse;
    public brand: GetBrandResponse;
    public manufacturer: GetManufactureResponse;
    public item: Item[] | []

}

export class Item {
    public id: string;
    public video?: string;
    public image: string;
    public createAt?: Date;
    public productId: string;
    public isActive?: boolean;
    public priceOut?: number;
    public quantity?: number;
    public productAttribute?: GetProductAttributeResponse[] | []
}


export class GetAllProductDTO extends DTO {


    public static url = '/get-all';
    public readonly url: string = GetAllProductDTO.url;
    public readonly method = METHOD.GET;
    public responseDTOClass = GetAllProductResponse;

    public bodyDTO: any;
    public queryDTO: PaginationDTO;
    public paramDTO: any;
}

export class GetProductResponse { }