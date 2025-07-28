import { LOGIN_ROUTE } from '@constants/routes.constants';
import { Sidebar } from '@features/pages/sidebar/sidebar.component';
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

  return <Sidebar />;
};
