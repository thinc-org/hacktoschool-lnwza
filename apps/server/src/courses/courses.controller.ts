import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import CourseEntity from "./course.entity";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { GetStudentDto } from "./dto/get-student.dto";

@Controller("courses")
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Post()
  async create(@Req() req, @Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.create(req['users'].uid, createCourseDto);
  }

  @Get(":courseId/")
  async getCourseInfo(
    @Param("courseId") courseId: string,
  ): Promise<CourseEntity> {
    return await this.coursesService.getCourseInfo(courseId);
  }

  @Post(":courseId")
  async enrollCourse(@Param("courseId") courseId: string, @Req() req) {
    console.log('ok')
    return await this.coursesService.enrollCourse(courseId, req['users'].uid);
  }

  @Get(":courseId/students")
  async getAllStudents(
    @Param("courseId") courseId: string,
    @Req() req,
  ): Promise<GetStudentDto> {
    return await this.coursesService.getAllStudents(courseId, req['users'].uid);
  }
}
