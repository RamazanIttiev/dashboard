import { JSX } from 'solid-js';
import { SidebarMenu, SidebarMenuItem } from '../sidebar-menu/sidebar-menu.component';
import { SidebarAvatar } from './sidebar-avatar.component';

export const SidebarDrawer = (props: {
  onLogout: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  menuItems: SidebarMenuItem[];
}) => (
  <aside
    id='layout-toggle'
    class='overlay overlay-open:translate-x-0 drawer drawer-start inset-y-0 start-0 hidden h-full [--auto-close:lg] sm:w-75 lg:block lg:translate-x-0 lg:shadow-none'
    aria-label='Sidebar'
    tabIndex='-1'
  >
    <div class='drawer-body border-base-content/20 h-full border-e p-0'>
      <div class='flex h-full max-h-full flex-col'>
        <button
          type='button'
          class='btn btn-text btn-circle btn-sm absolute end-3 top-3 lg:hidden'
          aria-label='Close'
          data-overlay='#layout-toggle'
        >
          <span class='icon-[tabler--x] size-5'></span>
        </button>
        <SidebarAvatar />
        <div class='h-full overflow-y-auto flex pt-2 pb-2 pr-2 pl-2 flex-col justify-between'>
          <SidebarMenu items={props.menuItems} />
          <button onClick={props.onLogout} type={'button'} class='btn btn-outline'>
            Logout
          </button>
        </div>
      </div>
    </div>
  </aside>
);
