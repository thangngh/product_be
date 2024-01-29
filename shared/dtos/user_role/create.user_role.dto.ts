import { IsNotEmpty, IsString } from "class-validator";
import { DTO, ResponseDTO } from "../base.dto";
import { METHOD } from "@shared/constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRoleBodyDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
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