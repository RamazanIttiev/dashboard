import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto, Student } from '../student.entity';
import { StudentService } from '../student.service';

describe('StudentService', () => {
  let service: StudentService;
  let repo: jest.Mocked<Repository<Student>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<Student>>> = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: repoMock,
        },
      ],
    }).compile();
    service = module.get<StudentService>(StudentService);
    repo = module.get(getRepositoryToken(Student));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a student successfully', async () => {
    const dto: CreateStudentDto = {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone: '+79161234567',
      age: 20,
      city: 'Moscow',
    };
    repo.findOne.mockResolvedValue(null);
    const student = { ...dto, id: 'uuid-123' } as Student;
    repo.create.mockReturnValue(student);
    repo.save.mockResolvedValue(student);
    const result = await service.create(dto);
    expect(result).toEqual(student);
    expect(repo.findOne).toHaveBeenCalledWith({
      where: [{ phone: dto.phone }, { email: dto.email }],
    });
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(student);
  });

  it('should throw ConflictException if phone already exists', async () => {
    const dto: CreateStudentDto = {
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+79161234568',
    };
    repo.findOne.mockResolvedValue({ ...dto, id: 'uuid-456' } as Student);
    await expect(service.create(dto)).rejects.toThrow(ConflictException);
    expect(repo.findOne).toHaveBeenCalledWith({
      where: [{ phone: dto.phone }, { email: dto.email }],
    });
  });

  it('should throw ConflictException if email already exists', async () => {
    const dto: CreateStudentDto = {
      name: 'Jane',
      surname: 'Smith',
      email: 'existing@example.com',
      phone: '+79161234569',
    };
    repo.findOne.mockResolvedValue({ ...dto, id: 'uuid-789' } as Student);
    await expect(service.create(dto)).rejects.toThrow(ConflictException);
    expect(repo.findOne).toHaveBeenCalledWith({
      where: [{ phone: dto.phone }, { email: dto.email }],
    });
  });

  it('should create a student with only required fields', async () => {
    const dto: CreateStudentDto = {
      name: 'Alice',
      surname: 'Wonder',
      email: 'alice@example.com',
      phone: '+79161234570',
    };
    repo.findOne.mockResolvedValue(null);
    const student = { ...dto, id: 'uuid-999' } as Student;
    repo.create.mockReturnValue(student);
    repo.save.mockResolvedValue(student);
    const result = await service.create(dto);
    expect(result).toEqual(student);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(student);
  });

  it('should propagate errors from repository', async () => {
    const dto: CreateStudentDto = {
      name: 'Bob',
      surname: 'Builder',
      email: 'bob@example.com',
      phone: '+79161234571',
    };
    repo.findOne.mockRejectedValue(new Error('DB error'));
    await expect(service.create(dto)).rejects.toThrow('DB error');
  });
});
