import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Module({
  providers: [StudentService],
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([Student])],
  exports: [StudentService],
})
export class StudentModule {}
