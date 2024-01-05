import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import Role from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity';
import { UserRoleRepository } from './user_role.reposiitory';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole, Role, User])
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService]
})
export class UserRoleModule { }
