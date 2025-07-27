import {JWTToken, LogInDto, SignUpDto, SignUpResponse} from '@models/auth.model';
import axios from 'axios';

const LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/logIn`;
const SIGNUP_URL = `${import.meta.env.VITE_API_URL}/auth/signUp`;
const VALIDATE_URL = `${import.meta.env.VITE_API_URL}/auth/validate`;

export class AuthService {
  async login(payload: LogInDto): Promise<JWTToken> {
    try {
      const response = await axios.post(LOGIN_URL, payload);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signUp(payload: SignUpDto): Promise<SignUpResponse> {
    try {
      return await axios.post(SIGNUP_URL, payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateToken(token: string): Promise<{ isValid: boolean }> {
    try {
      const res = await axios.post(
        VALIDATE_URL,
        { data: undefined },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!res.data.isValid) {
        localStorage.removeItem('access_token');
        return {
          isValid: false,
        };
      }

      return res.data;
    } catch {
      return {
        isValid: false,
      };
    }
  }
}
