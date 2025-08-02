import { Student } from '@models/student.model';
import { StudentService } from '@services/student.service';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock the StudentService
vi.mock('@services/student.service');

// Mock createRoot to return the store directly
vi.mock('solid-js', async () => {
  return await vi.importActual('solid-js');
});

describe('studentsStore', () => {
  let studentsStore: any;
  let mockStudentService: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Import the store after mocking
    const { studentsStore: store } = await import('@stores/students/students.store');
    studentsStore = store;

    // Get the mocked StudentService
    mockStudentService = vi.mocked(StudentService);
  });

  describe('createStudent', () => {
    test('should successfully create a student', async () => {
      // Mock successful student creation
      mockStudentService.prototype.createStudent.mockResolvedValue('new-student-id');

      // Test data - student with all required fields
      const testStudent: Student = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        age: 25,
        city: 'New York',
      };

      // Call the store method
      await studentsStore.createStudent(testStudent);

      // Verify the service was called with the correct payload (without id)
      expect(mockStudentService.prototype.createStudent).toHaveBeenCalledWith({
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        age: 25,
        city: 'New York',
      });

      // Verify the service was called exactly once
      expect(mockStudentService.prototype.createStudent).toHaveBeenCalledTimes(1);
    });

    test('should create a student with only required fields', async () => {
      // Mock successful student creation
      mockStudentService.prototype.createStudent.mockResolvedValue('new-student-id');

      // Test data - student with only required fields
      const testStudent: Student = {
        name: 'Jane',
        surname: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        // age and city are optional, so not included
      };

      // Call the store method
      await studentsStore.createStudent(testStudent);

      // Verify the service was called with the correct payload (without id)
      expect(mockStudentService.prototype.createStudent).toHaveBeenCalledWith({
        name: 'Jane',
        surname: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
      });

      // Verify the service was called exactly once
      expect(mockStudentService.prototype.createStudent).toHaveBeenCalledTimes(1);
    });

    test('should handle service errors gracefully', async () => {
      // Mock failed student creation
      const errorMessage = 'CreateStudent failed';
      mockStudentService.prototype.createStudent.mockRejectedValue(new Error(errorMessage));

      // Test data
      const testStudent: Student = {
        name: 'Error',
        surname: 'Test',
        email: 'error@test.com',
        phone: '+1111111111',
      };

      // Expect the error to be thrown
      await expect(studentsStore.createStudent(testStudent)).rejects.toThrow(errorMessage);

      // Verify the service was still called
      expect(mockStudentService.prototype.createStudent).toHaveBeenCalledWith({
        name: 'Error',
        surname: 'Test',
        email: 'error@test.com',
        phone: '+1111111111',
      });
    });
  });

  describe('store structure', () => {
    test('should expose createStudent method', () => {
      // Verify the store has the expected method
      expect(studentsStore).toHaveProperty('createStudent');
      expect(typeof studentsStore.createStudent).toBe('function');
    });

    test('should not expose internal service directly', () => {
      // Verify the internal service is not exposed
      expect(studentsStore).not.toHaveProperty('studentsService');
    });
  });
});
