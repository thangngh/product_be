import { User } from "@models/user/entities/user.entity";
import { DTO } from "../base.dto";
import { METHOD } from "@shared/constant";

export class GetNameUserResponse {
    public id: string;

    public name: string;
}

export class GetProfileResponse extends User {

}

export class GetProfileDTO extends DTO {
    public static url = '/profile'
    public readonly url: string = GetProfileDTO.url;
    public readonly method: METHOD = METHOD.GET;
    public readonly responseDTOClass: GetProfileResponse;
    public bodyDTO: any;
    public queryDTO: any;
    public paramDTO: any;

}