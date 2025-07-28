import { JSX } from 'solid-js';

export const SidebarMain = (props: { children: JSX.Element }) => (
  <div class='flex grow flex-col lg:ps-75'>
    <main class='mx-auto w-full max-w-7xl flex-1 p-6'>{props.children}</main>
  </div>
);
