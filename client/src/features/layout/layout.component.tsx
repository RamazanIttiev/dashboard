import { useLocation } from '@solidjs/router';
import { createContext, createEffect, createSignal, ParentComponent, useContext } from 'solid-js';

type AppContextType = {
  isAuthenticated: () => boolean;
  setIsAuthenticated: (val: boolean) => void;
};

const AppContext = createContext<AppContextType>();

async function loadFlyonUI() {
  return import('flyonui/flyonui.js');
}

export const Layout: ParentComponent = (props) => {
  const location = useLocation();
  const [_, setLoc] = createSignal(location.pathname);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  createEffect(() => {
    const initFlyonUI = async () => {
      await loadFlyonUI();
    };

    initFlyonUI();
  });

  createEffect(() => {
    setLoc(location.pathname);

    setTimeout(() => {
      if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  });

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within Layout');
  return context;
};
