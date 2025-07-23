import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { UsersService } from '../users/users.service';
import { AccessTokenPayload, JWTTokens, LogInDto, RefreshTokenPayload, SignUpDto } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async generateTokens(id: string) {
    const access_token = await this.jwtService.signAsync(
      { sub: id },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}s`,
      },
    );

    const refresh_token = await this.jwtService.signAsync(
      { sub: id },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}d`,
      },
    );

    return { access_token, refresh_token };
  }

  async logIn(@Body() body: LogInDto): Promise<JWTTokens> {
    const { email, password } = body;

    const user = await this.usersService.findByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const { access_token, refresh_token } = await this.generateTokens(user.id);

    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(@Body() body: SignUpDto): Promise<JWTTokens> {
    const hash = await bcrypt.hash(body.password, 10);

    const payload = { ...body, id: uuid(), password: hash };

    const newUserId = await this.usersService.create(payload);

    const { access_token, refresh_token } = await this.generateTokens(newUserId);

    return { access_token, refresh_token };
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
