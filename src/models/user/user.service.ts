import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { SignUpBodyDTO } from '@shared/dtos/auth/sign_up.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async findUserById(userId: string): Promise<User> {
        const query = await this.userRepository.findUserById(userId)

        return query;
    }

    async existUsername(username: string): Promise<boolean> {
        const query = await this.userRepository.findUserByUsername(username)

        return !!query
    }

    async existEmail(email: string): Promise<boolean> {
        const query = await this.userRepository.findUserByEmail(email)

        return !!query;
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
