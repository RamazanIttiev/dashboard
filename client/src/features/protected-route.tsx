import { HOME_ROUTE, LOGIN_ROUTE, STUDENTS_ROUTE } from '@constants/routes.constants';
import { Navigate, useLocation, useNavigate } from '@solidjs/router';
import { authStore } from '@stores/auth.store';
import { createSignal, Match, onMount, ParentProps, Switch } from 'solid-js';

export const RouteGuard = (props: ParentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, validateToken, refreshToken } = authStore;

  const [isLoading, setIsLoading] = createSignal(true);

  onMount(async () => {
    const valid = await validateToken();

    if (valid) {
      if (isAuthenticated() && location.pathname === HOME_ROUTE) {
        navigate(STUDENTS_ROUTE, { replace: true });
      }
    } else {
      try {
        await refreshToken();

        if (isAuthenticated() && location.pathname === HOME_ROUTE) {
          navigate(STUDENTS_ROUTE, { replace: true });
        }
      } catch (err) {
        navigate(LOGIN_ROUTE, { replace: true });
      }
    }

    setIsLoading(false); // mark loading as complete
  });

  return (
    <Switch>
      <Match when={isLoading()}>
        <div>Loading...</div>
      </Match>
      <Match when={isAuthenticated()}>{props.children}</Match>
      <Match when={!isAuthenticated()}>
        <Navigate href={LOGIN_ROUTE} />
      </Match>
    </Switch>
  );
};
