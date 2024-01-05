import { Injectable } from '@nestjs/common';
import RoleRepository from './role.repository';

@Injectable()
export class RoleService {

    constructor(
        private readonly roleRepository: RoleRepository
    ) { }

    async findRoleById(id: string) {
        return await this.roleRepository.findRoleById(id)
    }
}
