import { LOGIN_ROUTE, STUDENTS_ROUTE } from '@constants/routes.constants';
import { SidebarDrawer } from '@features/sidebar/components/sidebar-drawer/sidebar-drawer.component';
import { SidebarHeader } from '@features/sidebar/components/sidebar-header/sidebar-header.component';
import { SidebarMain } from '@features/sidebar/components/sidebar-main/sidebar-main.component';
import { SidebarMenuItem } from '@features/sidebar/components/sidebar-menu/sidebar-menu.component';
import { useNavigate } from '@solidjs/router';
import { authStore } from '@stores/auth/auth.store';
import { JSX } from 'solid-js';

const menuItems: SidebarMenuItem[] = [
  {
    label: 'Ученики',
    icon: 'icon-[tabler--user]',
    href: STUDENTS_ROUTE,
  },
];

export const Sidebar = (props: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { logout } = authStore;

  const handleLogout = async () => {
    try {
      await logout();

      navigate(LOGIN_ROUTE);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div class='bg-base-200 flex min-h-screen flex-col'>
      <SidebarHeader />
      <SidebarDrawer onLogout={handleLogout} menuItems={menuItems} />
      <SidebarMain>{props.children}</SidebarMain>
    </div>
  );
};
