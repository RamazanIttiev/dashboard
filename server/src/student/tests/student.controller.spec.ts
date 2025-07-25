import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from '../student.controller';
import { CreateStudentDto } from '../student.entity';
import { StudentService } from '../student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  const mockStudentService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
    jest.clearAllMocks();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('studentService should be defined', () => {
    expect(studentService).toBeDefined();
  });

  it('should create a student and return id', async () => {
    const dto: CreateStudentDto = {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone: '+79161234567',
      age: 20,
      city: 'Moscow',
    };
    const student = { ...dto, id: 'uuid-123' };
    mockStudentService.create.mockResolvedValue(student);

    const result = await controller.create(dto);
    expect(result).toBe('uuid-123');
    expect(mockStudentService.create).toHaveBeenCalledWith(dto);
  });

  it('should throw ConflictException if email already exists', async () => {
    const dto: CreateStudentDto = {
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+79161234568',
    };
    mockStudentService.create.mockRejectedValue(new ConflictException('Student already exists'));

    await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    expect(mockStudentService.create).toHaveBeenCalledWith(dto);
  });

  it('should throw ConflictException if phone already exists', async () => {
    const dto: CreateStudentDto = {
      name: 'Jane',
      surname: 'Smith',
      email: 'example@example.com',
      phone: '+79161234568',
    };
    mockStudentService.create.mockRejectedValue(new ConflictException('Student already exists'));

    await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    expect(mockStudentService.create).toHaveBeenCalledWith(dto);
  });

  it('should handle missing required fields', async () => {
    // Simulate what would happen if validation is bypassed and service is called with missing fields
    const dto: any = {
      surname: 'Doe',
      email: 'missing.name@example.com',
      phone: '+79161234569',
    };
    // Service would likely throw or save incomplete data, but controller does not validate
    mockStudentService.create.mockResolvedValue({ ...dto, id: 'uuid-456' });
    const result = await controller.create(dto);
    expect(result).toBe('uuid-456');
    expect(mockStudentService.create).toHaveBeenCalledWith(dto);
  });

  it('should handle optional fields', async () => {
    const dto: CreateStudentDto = {
      name: 'Alice',
      surname: 'Wonder',
      email: 'alice@example.com',
      phone: '+79161234570',
      // age and city omitted
    };
    const student = { ...dto, id: 'uuid-789' };
    mockStudentService.create.mockResolvedValue(student);
    const result = await controller.create(dto);
    expect(result).toBe('uuid-789');
    expect(mockStudentService.create).toHaveBeenCalledWith(dto);
  });
});
