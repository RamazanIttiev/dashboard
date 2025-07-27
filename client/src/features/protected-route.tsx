import { useAppContext } from '@features/layout/layout.component';
import { Navigate } from '@solidjs/router';
import { ParentComponent, Show } from 'solid-js';

export const RouteGuard: ParentComponent = (props) => {
  const { isAuthenticated } = useAppContext();

  return (
    <Show when={isAuthenticated()} fallback={<Navigate href='/signUp' />}>
      {props.children}
    </Show>
  );
};
