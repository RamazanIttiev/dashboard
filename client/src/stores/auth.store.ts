import { AuthService } from '@services/auth.service';
import { createRoot, createSignal } from 'solid-js';

export const authStore = createRoot(() => {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  const authService = new AuthService();

  const register = async (payload: any) => {
    try {
      const response = await authService.signUp(payload);

      localStorage.setItem('access_token', response.data.access_token);

      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const login = async (payload: any) => {
    try {
      const { access_token } = await authService.login(payload);

      localStorage.setItem('access_token', access_token);

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Error signing up:', error);
    }
  };

  const logout = async () => {
    localStorage.removeItem('access_token');

    try {
      await authService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Error during logout:', error);
    }
  };

  const validateToken = async () => {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      setIsAuthenticated(false);
      return false;
    }

    const { isValid } = await authService.validateToken(access_token);

    if (isValid) {
      setIsAuthenticated(true);

      return true;
    }

    setIsAuthenticated(false);
    return isValid;
  };

  const refreshToken = async () => {
    try {
      const { access_token } = await authService.refreshToken();

      if (access_token) {
        localStorage.setItem('access_token', access_token);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  return { isAuthenticated, login, logout, register, validateToken, refreshToken };
});
