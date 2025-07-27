import { Layout } from '@features/layout/layout.component';
import { LogInPage } from '@features/pages/log-in/log-in.page';
import { SignUpPage } from '@features/pages/sign-up/sign-up.page';
import { RouteGuard } from '@features/protected-route';
import { Route, Router } from '@solidjs/router';

export const App = () => {
  return (
    <Router root={Layout}>
      <Route path='/logIn' component={LogInPage} />
      <Route path='/signUp' component={SignUpPage} />
      <Route component={RouteGuard}>
        <Route path='/' component={() => <div>WELCOME</div>} />
      </Route>

      <Route path='*' component={() => <div>Page Not found!!!</div>} />
    </Router>
  );
};
