import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessTokenPayload, LogInDto, LoginResponse, RefreshTokenPayload } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(@Body() body: LogInDto): Promise<LoginResponse> {
    const { username, password: pass } = body;

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
        expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}d`,
      },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(
    @Body('refresh_token') refresh_token: string,
  ): Promise<AccessTokenPayload & RefreshTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Optional: Check if token exists in DB and is valid

      const newAccessToken = await this.jwtService.signAsync(
        { id: payload.sub },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}s`,
        },
      );

      const newRefreshToken = await this.jwtService.signAsync(
        { id: payload.sub },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}d`,
        },
      );

      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
