import { LOGIN_ROUTE } from '@constants/routes.constants';
import { AuthService } from '@services/auth.service';
import { useNavigate } from '@solidjs/router';
import { JSX } from 'solid-js';

export const Sidebar = () => {
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate(LOGIN_ROUTE);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div class='bg-base-200 flex min-h-screen flex-col'>
      <SidebarHeader />
      <SidebarDrawer onLogout={handleLogout} />
      <SidebarMain />
    </div>
  );
};

const SidebarAvatar = () => (
  <div class='text-base-content border-base-content/20 flex flex-col items-center gap-4 border-b px-4 py-6'>
    <div class='avatar'>
      <div class='size-17 rounded-full'>
        <img src='https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png' alt='avatar' />
      </div>
    </div>
    <div class='text-center'>
      <h3 class='text-base-content text-lg font-semibold'>Ramazan Ittiev</h3>
    </div>
  </div>
);

const SidebarMenu = () => (
  <ul class='menu menu-sm gap-1 pt-0 pb-0 pr-2 pl-2'>
    <li class='text-base-content/50 mt-2.5 p-2 text-xs uppercase'>Обучение</li>
    <li>
      <a href='#' class='px-2'>
        <span class='icon-[tabler--users] size-4.5'></span>
        Ученики
      </a>
    </li>
  </ul>
);

const SidebarLogout = (props: {
  onLogout: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}) => (
  <button onClick={props.onLogout} type={'button'} class='btn btn-outline'>
    Logout
  </button>
);

const SidebarDrawer = (props: {
  onLogout: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
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
          <SidebarMenu />
          <SidebarLogout onLogout={props.onLogout} />
        </div>
      </div>
    </div>
  </aside>
);

const SidebarHeader = () => (
  <div class='bg-base-100 sticky top-0 z-50 flex lg:ps-75'>
    <div class='mx-auto w-full max-w-7xl'>
      <nav class='navbar h-16'>
        <button
          type='button'
          class='btn btn-soft btn-square btn-sm me-2 lg:hidden'
          aria-haspopup='dialog'
          aria-expanded='false'
          aria-controls='layout-toggle'
          data-overlay='#layout-toggle'
        >
          <span class='icon-[tabler--menu-2] size-4.5'></span>
        </button>
      </nav>
    </div>
  </div>
);

const SidebarMain = () => (
  <div class='flex grow flex-col lg:ps-75'>
    <main class='mx-auto w-full max-w-7xl flex-1 p-6'>
      <div class='grid grid-cols-1 gap-6'>
        <div class='card h-120 w-full'>
          <div class='card-body border-base-content/20 rounded-box skeleton-striped m-6 border'></div>
        </div>
        <div class='card h-120 w-full'>
          <div class='card-body border-base-content/20 rounded-box skeleton-striped m-6 border'></div>
        </div>
      </div>
    </main>
  </div>
);
