import { Controller, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';
import Course from './course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }
}
