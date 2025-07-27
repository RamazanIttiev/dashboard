import { createContext, createSignal, ParentComponent, useContext } from 'solid-js';

type AppContextType = {
  isAuthenticated: () => boolean;
  setIsAuthenticated: (val: boolean) => void;
};

const AppContext = createContext<AppContextType>();

export const Layout: ParentComponent = (props) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

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
