import { Injectable } from '@nestjs/common';
import type { UseDTO } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UseDTO | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
