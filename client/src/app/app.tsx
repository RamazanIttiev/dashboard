import { Layout, useAppContext } from '@features/layout/layout.component';
import { SignUpPage } from '@features/pages/sign-up/sign-up.page';
import { RouteGuard } from '@features/protected-route';
import { Route, Router } from '@solidjs/router';

export const App = () => {
  return (
    <Router root={Layout}>
      <Route path='/signUp' component={SignUpPage} />
      <Route component={RouteGuard}>
        <Route
          path='/'
          component={() => {
            const { setIsAuthenticated } = useAppContext();
            return (
              <button type={'button'} onClick={() => setIsAuthenticated(false)}>
                Logout
              </button>
            );
          }}
        />
      </Route>

      <Route path='*' component={() => <div>Page Not found!!!</div>} />
    </Router>
  );
};
