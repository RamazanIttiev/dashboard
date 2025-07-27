export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface LogInDto {
  email: string;
  password: string;
}

export interface SignUpResponse {
  data: {
    access_token: string;
  };
  status: number;
  statusText: string;
}

export interface JWTToken {
  access_token: string;
}
