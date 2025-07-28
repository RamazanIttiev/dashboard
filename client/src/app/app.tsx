import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@constants/routes.constants';
import { Layout } from '@features/layout/layout.component';
import { HomePage } from '@features/pages/home/home.page';
import { LogInPage } from '@features/pages/log-in/log-in.page';
import { SignUpPage } from '@features/pages/sign-up/sign-up.page';
import { RouteGuard } from '@features/protected-route';
import { Route, Router } from '@solidjs/router';

export const App = () => {
  return (
    <Router root={Layout}>
      <Route path={LOGIN_ROUTE} component={LogInPage} />
      <Route path={SIGNUP_ROUTE} component={SignUpPage} />
      <Route component={RouteGuard}>
        <Route path='/' component={HomePage} />
      </Route>

      <Route path='*' component={() => <div>Page Not found!!!</div>} />
    </Router>
  );
};
