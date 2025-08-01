import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':email')
  async findUser(@Param('email') email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }
}
