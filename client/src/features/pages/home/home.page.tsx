import { LOGIN_ROUTE } from '@constants/routes.constants';
import { AuthService } from '@services/auth.service';
import { useNavigate } from '@solidjs/router';

export const HomePage = () => {
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate(LOGIN_ROUTE);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} type={'button'} class='btn btn-outline'>
      Logout
    </button>
  );
};
