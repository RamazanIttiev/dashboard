import { useLocation } from '@solidjs/router';

export type SidebarMenuItem = {
  label: string;
  icon?: string;
  href: string;
  class?: string;
};

export const SidebarMenu = (props: { items: SidebarMenuItem[] }) => {
  const location = useLocation();
  return (
    <ul class='menu menu-sm gap-1 pt-0 pb-0 pr-2 pl-2'>
      {props.items.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <li class={isActive ? 'bg-accent-content font-bold rounded-t-box rounded-b-box' : ''}>
            <a href={item.href} class={`'px-2' ${item.class}`}>
              {item.icon && <span class={item.icon}></span>}
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
