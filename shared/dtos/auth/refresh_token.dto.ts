import { METHOD } from "@shared/constant";
import { DTO } from "../base.dto";


export class RefreshTokenDTO extends DTO {
    public static url = '/refresh-token';
    public readonly url: string = RefreshTokenDTO.url;
    public readonly method = METHOD.POST;
    public readonly responseDTOClass: undefined;

    public bodyDTO: undefined;
    public paramDTO: undefined;
    public queryDTO: undefined;
}