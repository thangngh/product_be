import { Controller } from '@nestjs/common';
import { UserRoleService } from './user_role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}
}
