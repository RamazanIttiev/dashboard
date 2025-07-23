import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} is not found`);
    }

    return user;
  }

  async create(body: User): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { email: body.email } });

    if (user) {
      throw new ConflictException(`User with email ${body.email} already exists.`);
    }

    const created = await this.usersRepository.save(body);
    return created.id;
  }
}
