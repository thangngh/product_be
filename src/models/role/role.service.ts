import { Injectable } from '@nestjs/common';
import RoleRepository from './role.repository';
import { ERole } from '@shared/constant';

@Injectable()
export class RoleService {

    constructor(
        private readonly roleRepository: RoleRepository
    ) { }

    async findRoleById(id: string) {
        return await this.roleRepository.findRoleById(id)
    }

    async setInitRole() {
        const query = await this.roleRepository.findRoleByName(ERole['USER'])

        return query.id
    }
}
