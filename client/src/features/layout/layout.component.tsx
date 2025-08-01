import { useLocation } from '@solidjs/router';
import { createEffect, createSignal, ParentComponent } from 'solid-js';

async function loadFlyonUI() {
  return import('flyonui/flyonui.js');
}

export const Layout: ParentComponent = (props) => {
  const location = useLocation();
  const [_, setLoc] = createSignal(location.pathname);

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

  return props.children;
};
