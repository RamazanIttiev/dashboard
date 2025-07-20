import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<LoginResponse> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) throw new UnauthorizedException();

    const access_token = await this.jwtService.signAsync({
      id: user.userId,
      username: user.username,
    });

    const refresh_token = await this.jwtService.signAsync(
      { sub: user.userId },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
