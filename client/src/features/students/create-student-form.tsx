import { STUDENTS_ROUTE } from '@constants/routes.constants';
import { Student } from '@features/students/student.model';
import { useNavigate } from '@solidjs/router';
import { FormField } from '@ui/components/form-field';
import { createStore } from 'solid-js/store';

export const CreateStudentForm = () => {
  const navigate = useNavigate();
  const [student, setStudent] = createStore<Student>({
    id: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    age: 0,
    city: '',
  });

  const handleBack = () => {
    navigate(STUDENTS_ROUTE);
  };

  const handleFieldChange = (field: keyof Student, value: string | number) => {
    setStudent(field, value);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    // Here you would typically send the student data to your backend
    console.log('Student data submitted:', student);

    // After submission, you might want to navigate back or show a success message
    // navigate(STUDENTS_ROUTE);
  };

  return (
    <div class={'flex justify-center relative'}>
      <button
        class='btn btn-square btn-outline btn-primary absolute left-4'
        aria-label='Icon Button'
        type={'button'}
        onClick={handleBack}
      >
        <span class='icon-[tabler--arrow-narrow-left] size-4.5 shrink-0'></span>
      </button>

      <div class={'w-[420px]'}>
        <h2 class={'text-xl font-bold w-full mb-10'}>Create Student</h2>
        <form class={'flex gap-4 flex-col w-full'}>
          <div class={'flex flex-wrap justify-between gap-4 w-full'}>
            <div class={'flex  w-full gap-4'}>
              <FormField
                label={'name'}
                id={'name'}
                type={'name'}
                value={''}
                autocomplete={'off'}
                required
                onChange={(e) => handleFieldChange('name', e.currentTarget.value)}
                theme={{ container: 'w-full' }}
              />
              <FormField
                label={'surname'}
                id={'surname'}
                type={'surname'}
                value={''}
                required
                autocomplete={'off'}
                onChange={(e) => handleFieldChange('surname', e.currentTarget.value)}
                theme={{ container: 'w-full' }}
              />
            </div>
            <div class={'flex  w-full gap-4'}>
              <FormField
                label={'email'}
                id={'email'}
                type={'email'}
                value={''}
                required
                autocomplete={'off'}
                onChange={(e) => handleFieldChange('email', e.currentTarget.value)}
                theme={{ container: 'w-full' }}
              />
              <FormField
                label={'phone'}
                id={'phone'}
                type={'tel'}
                value={''}
                required
                autocomplete={'off'}
                onChange={(e) => handleFieldChange('phone', e.currentTarget.value)}
                theme={{ container: 'w-full' }}
              />
            </div>
            <div class={'flex  w-full gap-4'}>
              <FormField
                label={'age'}
                id={'age'}
                type={'number'}
                value={''}
                autocomplete={'off'}
                onChange={(e) => handleFieldChange('age', parseInt(e.currentTarget.value))}
                theme={{ container: 'w-full' }}
              />
              <FormField
                label={'city'}
                id={'city'}
                type={'text'}
                value={''}
                autocomplete={'off'}
                onChange={(e) => handleFieldChange('city', e.currentTarget.value)}
                theme={{ container: 'w-full' }}
              />
            </div>
          </div>

          <button class='btn' type={'button'} onClick={handleSubmit}>
            Create Student
          </button>
        </form>
      </div>
    </div>
  );
};
