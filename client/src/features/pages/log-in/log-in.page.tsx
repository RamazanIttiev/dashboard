import { SIGNUP_ROUTE, STUDENTS_ROUTE } from '@constants/routes.constants';
import { useNavigate } from '@solidjs/router';
import { authStore } from '@stores/auth/auth.store';
import { FormField } from '@ui/components/form-field';
import { PasswordField } from '@ui/components/password-field';
import { createStore } from 'solid-js/store';

type LoginStoreFields = 'email' | 'password';

export const LogInPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = authStore;

  const [store, setStore] = createStore({
    email: '',
    password: '',
  });

  const handleFieldChange = (field: LoginStoreFields, value: string) => {
    setStore(field, value);
  };

  const handleSubmit = async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    const payload = {
      email: store.email,
      password: store.password,
    };

    try {
      await login(payload);

      if (isAuthenticated()) {
        navigate(STUDENTS_ROUTE, { replace: true });
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div class="flex min-h-screen items-center justify-center overflow-x-hidden bg-[url('https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/auth/auth-background-2.png')] bg-cover bg-center bg-no-repeat py-10">
      <div class='relative flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div class='bg-base-100 shadow-base-300/20 z-1 w-full space-y-6 rounded-xl p-6 shadow-md sm:min-w-md lg:p-8'>
          <h3 class='text-base-content mb-1.5 text-2xl font-semibold'>LogIn to CRM</h3>

          <form class='space-y-4'>
            <FormField
              id='userEmail'
              type='email'
              label='Email address*'
              autocomplete='email'
              placeholder='Enter your email'
              required
              value={store.email}
              onChange={(e) => handleFieldChange('email', e.currentTarget.value)}
            />
            <PasswordField
              id='userPassword'
              label='Password*'
              autocomplete='current-password'
              placeholder='••••••••'
              value={store.password}
              onChange={(e) => handleFieldChange('password', e.currentTarget.value)}
            />

            <button
              type='submit'
              onClick={handleSubmit}
              class='btn btn-lg btn-primary btn-gradient btn-block'
            >
              Sign Up to CRM
            </button>
          </form>

          <p class='text-base-content/80 mb-4 text-center'>
            Don't have an account?
            <a href={SIGNUP_ROUTE} class='link link-animated link-primary font-normal'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
