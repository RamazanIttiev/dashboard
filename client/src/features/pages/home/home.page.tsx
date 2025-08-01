import { RouteGuard } from '@features/protected-route';
import { Sidebar } from '@features/sidebar/sidebar.component';
import { ParentProps } from 'solid-js';

export const HomePage = (props: ParentProps) => {
  return (
    <RouteGuard>
      <Sidebar>{props.children}</Sidebar>
    </RouteGuard>
  );
};
