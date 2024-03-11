import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { GetProfileDTO, GetProfileResponse } from '@shared/dtos/user/get-user.dto';
import { authUser } from '@shared/decorators/auth.decorator';
import { User } from './entities/user.entity';
import { SerializeInterceptor } from '@shared/interceptors';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get(GetProfileDTO.url)
  @UseInterceptors(new SerializeInterceptor(GetProfileResponse))
  @UseGuards(JwtGuard)
  getProfile(@authUser() user: User) {
    return this.userService.getProfile(user)
  }

  editProfile() { }

  uploadAvatar() { }

  getAvatar() { }


}
