import CourseEntity from '../course.entity';

export class GetCourseDto {
  course: CourseEntity;
  enrolled: boolean;
  constructor(course: CourseEntity, enrolled: boolean) {
    this.course = course;
    this.enrolled = enrolled;
  }
}
