import { HOME_ROUTE, LOGIN_ROUTE, STUDENTS_ROUTE } from '@constants/routes.constants';
import { AuthService } from '@services/auth.service';
import { Navigate, useLocation, useNavigate } from '@solidjs/router';
import { createSignal, Match, onMount, ParentProps, Switch } from 'solid-js';

export const RouteGuard = (props: ParentProps) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const authService = new AuthService();

  onMount(async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const { isValid } = await authService.validateToken(token);

    if (isValid) {
      setIsAuthenticated(true);

      if (location.pathname === HOME_ROUTE) {
        navigate(STUDENTS_ROUTE);
      }

      return;
    }

    // Token invalid → try refresh
    try {
      const { access_token } = await authService.refreshToken();

      if (access_token) {
        localStorage.setItem('access_token', access_token);
        setIsAuthenticated(true);

        if (location.pathname === HOME_ROUTE) {
          navigate(STUDENTS_ROUTE);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  });

  return (
    <Switch>
      <Match when={isAuthenticated() === null}>
        <div>Loading...</div>
      </Match>
      <Match when={isAuthenticated()}>{props.children}</Match>
      <Match when={isAuthenticated() === false}>
        <Navigate href={LOGIN_ROUTE} />
      </Match>
    </Switch>
  );
};
