import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../shared/utils/decorators';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get('findUser')
  async findUser(@Query('email') email: string): Promise<User | null> {
    return await this.usersService.findByEmail(email);
  }
}
