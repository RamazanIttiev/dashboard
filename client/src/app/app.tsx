import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@constants/routes.constants';
import { Layout } from '@features/layout/layout.component';
import { HomePage } from '@features/pages/home/home.page';
import { LogInPage } from '@features/pages/log-in/log-in.page';
import { SignUpPage } from '@features/pages/sign-up/sign-up.page';
import { RouteGuard } from '@features/protected-route';
import { CreateStudentForm } from '@features/students/create-student-form';
import { StudentsView } from '@features/students/students.view';
import { Route, Router } from '@solidjs/router';

export const App = () => {
  return (
    <Router root={Layout}>
      <Route component={RouteGuard} />
      <Route component={HomePage}>
        <Route path='/students'>
          <Route path='/' component={StudentsView} />
          <Route path='/create' component={CreateStudentForm} />
          <Route path='/:id' component={() => <div>1 student</div>} />
        </Route>
      </Route>
      <Route path={LOGIN_ROUTE} component={LogInPage} />
      <Route path={SIGNUP_ROUTE} component={SignUpPage} />
      <Route path='*' component={() => <div>Page Not found!!!</div>} />
    </Router>
  );
};
