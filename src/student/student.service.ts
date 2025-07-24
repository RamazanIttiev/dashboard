import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto, Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const result = await this.studentRepository.findOne({
      where: [{ phone: createStudentDto.phone }, { email: createStudentDto.email }],
    });

    if (result) {
      throw new ConflictException('Student already exists');
    }

    const student = this.studentRepository.create(createStudentDto);
    await this.studentRepository.save(student);
    return student;
  }
}
