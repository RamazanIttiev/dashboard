import {LOGIN_URL, LOGOUT_URL, SIGNUP_URL, VALIDATE_URL} from '@constants/api.constants';
import {JWTToken, LogInDto, SignUpDto, SignUpResponse} from '@models/auth.model';
import axios from 'axios';

export class AuthService {
  async login(payload: LogInDto): Promise<JWTToken> {
    try {
      const response = await axios.post(LOGIN_URL, payload);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('AuthService: login');
    }
  }

  async signUp(payload: SignUpDto): Promise<SignUpResponse> {
    try {
      return await axios.post(SIGNUP_URL, payload);
    } catch (error) {
      console.log(error);
      throw new Error('AuthService: signUp');
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await axios.post(LOGOUT_URL, {}, { headers: { Authorization: `Bearer ${token}` } });
      }
      localStorage.removeItem('access_token');
    } catch (error) {
      console.error('Error during logout:', error);
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
