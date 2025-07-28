import { Sidebar } from '@features/sidebar/sidebar.component';
import { ParentProps } from 'solid-js';

export const HomePage = (props: ParentProps) => {
  return <Sidebar>{props.children}</Sidebar>;
};
