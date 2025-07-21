import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '../shared/utils/decorators';
import { AccessTokenPayload, LogInDto } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private setCookies(token: string, res: Response) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: true, // true if using HTTPS
      sameSite: 'strict',
      path: '/auth/refresh', // optionally restrict path
      maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN
        ? Number(process.env.REFRESH_TOKEN_EXPIRES_IN) * 24 * 60 * 60 * 1000
        : 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Res() res: Response, @Body() loginDto: LogInDto): Promise<AccessTokenPayload> {
    const { access_token, refresh_token } = await this.authService.logIn({ ...loginDto });

    this.setCookies(refresh_token, res);

    return { access_token };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenPayload> {
    const token = req.cookies['refresh_token'];

    const { access_token, refresh_token } = await this.authService.refresh(token);

    this.setCookies(refresh_token, res);

    return { access_token };
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
