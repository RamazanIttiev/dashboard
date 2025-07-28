import { LOGIN_ROUTE } from '@constants/routes.constants';
import { AuthService } from '@services/auth.service';
import { Navigate } from '@solidjs/router';
import { createSignal, Match, onMount, ParentComponent, Switch } from 'solid-js';

export const RouteGuard: ParentComponent = (props) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | null>(null);

  const authService = new AuthService();

  onMount(async () => {
    const token = localStorage.getItem('access_token');

    if (!token) return setIsAuthenticated(false);

    const { isValid } = await authService.validateToken(token || '');

    if (isValid) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('access_token');
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
