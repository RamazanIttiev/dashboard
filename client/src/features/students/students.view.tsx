import { CREATE_STUDENT_ROUTE } from '@constants/routes.constants';
import { useNavigate } from '@solidjs/router';

export const StudentsView = () => {
  const navigate = useNavigate();

  const handleCreateStudent = () => {
    navigate(CREATE_STUDENT_ROUTE);
  };

  return (
    <div class='flex justify-end gap-4'>
      <button type={'button'} class={'btn'} onClick={handleCreateStudent}>
        Create Student
      </button>
    </div>
  );
};
