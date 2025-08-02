import { Student } from '@models/student.model';
import { StudentService } from '@services/student.service';
import { createRoot } from 'solid-js';

export const studentsStore = createRoot(() => {
  const studentsService = new StudentService();

  const createStudent = async (student: Student) => {
    await studentsService.createStudent(student);
  };

  return {
    createStudent,
  };
});
