import { Injectable } from '@nestjs/common';
import type { UseDTO } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      email: 'example@mail.com',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      email: 'example@mail.ru',
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(user: UseDTO): Promise<UseDTO> {
    // In a real application, you would hash the password and save it to a database
    this.users.push(user);
    return user;
  }

  async findOne(id: string): Promise<UseDTO | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
