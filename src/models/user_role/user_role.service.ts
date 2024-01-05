import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from './user_role.reposiitory';
import { CreateUserRoleBodyDTO, CreateUserRoleResponse } from '@shared/dtos/user_role/create.user_role.dto';
import { SYSTEM_CODE } from '@shared/constant';

@Injectable()
export class UserRoleService {

    constructor(
        private readonly userRoleRepository: UserRoleRepository
    ) { }

    async createUserRole(body: CreateUserRoleBodyDTO[]) {
        const query = await this.userRoleRepository.createUserRole(body)

        return query
    }

}
