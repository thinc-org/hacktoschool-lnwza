import { Controller, Get, Req } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser(@Req() req) {
    return await this.usersService.getUser(req['user'].uid);
  }
}
