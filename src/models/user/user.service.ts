import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { SignUpBodyDTO } from '@shared/dtos/auth/sign_up.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async findUserById(userId: string) {
        const query = await this.userRepository.findUserByField("id", userId)

        return query;
    }

    async findUserByUsername(username: string) {
        const query = await this.userRepository.findUserByField("username", username)

        return query
    }


    async findUserByEmail(email: string) {
        const query = await this.userRepository.findUserByField("email", email)

        return query
    }

    async registerUser(body: SignUpBodyDTO) {
        const user = this.userRepository.create(body)

        const query = await this.userRepository.saveUser(user)

        return query
    }

    async updateRefreshToken(user: User, refreshToken: string) {
        const { id } = user;

        const query = await this.userRepository.saveRefreshToken(id, refreshToken)

        return query;
    }
}
