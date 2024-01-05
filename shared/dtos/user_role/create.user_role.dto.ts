import { IsNotEmpty, IsString } from "class-validator";
import { DTO, ResponseDTO } from "../base.dto";
import { METHOD } from "@shared/constant";

export class CreateUserRoleBodyDTO {

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    roleId: string;
}

export class CreateUserRoleResponse extends ResponseDTO<CreateUserRoleBodyDTO>{

}

export class CreateUser extends DTO {
    public static readonly url = "/create/user-role"
    public url: string = CreateUser.url;
    public method: METHOD.POST;
    public responseDTOClass: CreateUserRoleResponse;
    public bodyDTO: CreateUserRoleBodyDTO;
    public queryDTO: any;
    public paramDTO: any;

}