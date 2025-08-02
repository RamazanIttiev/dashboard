import { LOGIN_ROUTE, STUDENTS_ROUTE } from '@constants/routes.constants';
import { useNavigate } from '@solidjs/router';
import { authStore } from '@stores/auth/auth.store';
import { FormField } from '@ui/components/form-field';
import { PasswordField } from '@ui/components/password-field';
import { createStore } from 'solid-js/store';

type SignUpFormFields = 'username' | 'email' | 'password' | 'confirmPassword';

export const SignUpPage = () => {
  const { isAuthenticated, register } = authStore;
  const navigate = useNavigate();

  const [store, setStore] = createStore({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleFieldChange = (field: SignUpFormFields, value: string) => {
    setStore(field, value);
  };

  const handleSubmit = async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    if (store.password !== store.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      username: store.username,
      email: store.email,
      password: store.password,
    };

    try {
      await register(payload);

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
          <h3 class='text-base-content mb-1.5 text-2xl font-semibold'>Sign Up to CRM</h3>

          <form class='space-y-4'>
            <FormField
              id='userName'
              type='text'
              label='Username*'
              autocomplete='username'
              placeholder='Enter your username'
              required
              value={store.username}
              onChange={(e) => handleFieldChange('username', e.currentTarget.value)}
            />
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
              placeholder='••••••••'
              autocomplete='new-password'
              value={store.password}
              onChange={(e) => handleFieldChange('password', e.currentTarget.value)}
            />
            <PasswordField
              id='userConfirmPassword'
              label='Confirm Password*'
              placeholder='••••••••'
              autocomplete='new-password'
              value={store.confirmPassword}
              onChange={(e) => handleFieldChange('confirmPassword', e.currentTarget.value)}
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
            Already have an account?
            <a href={LOGIN_ROUTE} class='link link-animated link-primary font-normal'>
              LogIn instead
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
