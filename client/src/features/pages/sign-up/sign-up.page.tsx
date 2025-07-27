import { FormField } from '@features/pages/sign-up/components/form-field';
import { PasswordField } from '@features/pages/sign-up/components/password-field';
import { useNavigate } from '@solidjs/router';
import { createStore } from 'solid-js/store';
import { AuthService } from '../../../services/auth.service';

export const SignUpPage = () => {
  const authService = new AuthService();
  const navigate = useNavigate();

  const [store, setStore] = createStore({
    userName: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword: '',
  });

  const handleFieldChange = (field: string, value: string | number | string[] | undefined) => {
    setStore(field, value);
  };

  const handleSubmit = async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    if (store.userPassword !== store.userConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      username: store.userName,
      email: store.userEmail,
      password: store.userPassword,
    };

    try {
      const response = await authService.signUp(payload);

      localStorage.setItem('access_token', response.data.access_token);

      if (response.status === 200) {
        navigate('/', { replace: true });
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
              placeholder='Enter your username'
              required
              value={store.userName}
              onChange={(e) => handleFieldChange('userName', e.currentTarget.value)}
            />
            <FormField
              id='userEmail'
              type='email'
              label='Email address*'
              placeholder='Enter your email'
              required
              value={store.userEmail}
              onChange={(e) => handleFieldChange('userEmail', e.currentTarget.value)}
            />
            <PasswordField
              id='userPassword'
              label='Password*'
              placeholder='••••••••'
              value={store.userPassword}
              onChange={(e) => handleFieldChange('userPassword', e.currentTarget.value)}
            />
            <PasswordField
              id='userConfirmPassword'
              label='Confirm Password*'
              placeholder='••••••••'
              value={store.userConfirmPassword}
              onChange={(e) => handleFieldChange('userConfirmPassword', e.currentTarget.value)}
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
            <a href='#' class='link link-animated link-primary font-normal'>
              {' '}
              LogIn instead
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
