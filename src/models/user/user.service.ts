import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { SignUpBodyDTO } from '@shared/dtos/auth/sign_up.dto';
import { SYSTEM_CODE } from '@shared/constant';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async findUserByField(field: keyof User, value: string) {
        const query = await this.userRepository.findUserByField(field, value);

        return query
    }

    async registerUser(body: SignUpBodyDTO) {
        const user = this.userRepository.create(body)

        const query = await this.userRepository.saveUser(user)

        return query
    }

    async updateRefreshToken(user: User, refreshToken: string) {
        const { id } = user;

        const query = await this.userRepository.updateStandAloneField(id, "refreshToken", refreshToken)

        return query;
    }

    async activeAccount(user: User) {
        const { id } = user;

        const queryUser = await this.findUserByField("id", id)

        if (queryUser.isActive) {
            throw new BadRequestException(SYSTEM_CODE.ACCOUNT_ALREADY_ACTIVATED)
        }

        const active = await this.userRepository.updateStandAloneField(id, "isActive", true)

        if (active.affected !== 1) {
            throw new InternalServerErrorException(SYSTEM_CODE.SORRY_SOMETHING_WENT_WRONG)
        }

        return queryUser;
    }

    async getProfile(user: User) {
        const { id } = user;
        const query = await this.userRepository.findUserByField("id", id, ['userRole'])

        return query;
    }
}
