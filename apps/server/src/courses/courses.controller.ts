import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { GetCourseDto } from './dto/get-course.dto';
import { GetStudentDto } from './dto/get-student.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Post()
  async create(@Req() req, @Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.create(req.headers.user, createCourseDto);
  }

  @Get(':courseId/')
  async getCourseInfo(
    @Param('courseId') courseId: string,
    @Req() req,
  ): Promise<GetCourseDto> {
    return await this.coursesService.getCourseInfo(courseId, req.headers.user);
  }

  @Get(':courseId/students')
  async getAllStudents(
    @Param('courseId') courseId: string,
    @Req() req,
  ): Promise<GetStudentDto> {
    return await this.coursesService.getAllStudents(courseId, req.headers.user);
  }

  @Post(':courseId')
  async enrollCourse(@Param('courseId') courseId: string, @Req() req) {
    return await this.coursesService.enrollCourse(courseId, req.headers.user);
  }
}
