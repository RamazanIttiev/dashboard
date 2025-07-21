export interface AccessTokenPayload {
  access_token: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export type LoginResponse = AccessTokenPayload & RefreshTokenPayload;

export interface LogInDto {
  username: string;
  password: string;
}
