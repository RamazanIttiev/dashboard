import { CREATE_STUDENT_URL } from '@constants/api.constants';
import { Student } from '@models/student.model';
import axios from 'axios';

export class StudentService {
  async createStudent(student: Omit<Student, 'id'>): Promise<string> {
    try {
      const response = await axios.post(CREATE_STUDENT_URL, student, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      return await response.data;
    } catch (error) {
      throw new Error('CreateStudent failed');
    }
  }
}
