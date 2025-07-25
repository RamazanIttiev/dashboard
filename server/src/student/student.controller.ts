import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentDto } from './student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentService.create(createStudentDto);

    return student.id;
  }
}
