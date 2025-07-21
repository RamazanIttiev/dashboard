export interface AccessTokenPayload {
  access_token: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export type JWTTokens = AccessTokenPayload & RefreshTokenPayload;

export interface LogInDto {
  username: string;
  password: string;
}

export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}
