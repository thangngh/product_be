import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import RoleRepository from './role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './entities/role.entity';
import { UserRole } from '../user_role/entities/user_role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, UserRole])
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService]
})
export class RoleModule { }
