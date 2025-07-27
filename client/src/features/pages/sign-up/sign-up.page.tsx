import { useAppContext } from '@features/layout/layout.component';
import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAppContext();

  createEffect(() => {
    if (isAuthenticated()) navigate('/');
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Please fill out the form to create an account.</p>
      <button type={'button'} onClick={() => setIsAuthenticated(true)}>
        Sign Up
      </button>
    </div>
  );
};
