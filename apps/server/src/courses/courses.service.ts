import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseEntity } from './course.entity';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateCourseDto } from './dto/create-course.dto';
import { GetCourseDto } from './dto/get-course.dto';
import { GetStudentDto } from './dto/get-student.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class CoursesService {
  async findAll(): Promise<CourseEntity[]> {
    const coursesDoc = getFirestore().collection('courses');
    const snapshot = await coursesDoc.get();
    const courses: CourseEntity[] = [];
    snapshot.forEach((doc) => {
      courses.push(new CourseEntity(doc.data()));
    });
    return courses;
  }

  //using pipe later to validate the createCourseDto
  async create(uid: string, createCourseDto: CreateCourseDto) {
    const userRef = getFirestore().collection('users').doc(uid);
    const userInfo = await userRef.get();
    const role = userInfo.data().roles;
    if (role !== 'instructor') {
      throw new HttpException(
        'You are not instructor!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const instructor = new UserEntity(userInfo.data());
    const newCoursesDoc = getFirestore().collection('courses').doc();
    const data = {
      uid: newCoursesDoc.id,
      title: createCourseDto.title,
      description: createCourseDto.description,
      instructor: {
        ouid: instructor.ouid,
        name: instructor.name,
        roles: instructor.roles,
        photoURL: instructor.photoURL,
      },
      students: [],
    };
    const course = new CourseEntity(data);
    await newCoursesDoc.set(data);
    return course;
  }

  async getCourseInfo(courseId: string, uid: string): Promise<GetCourseDto> {
    const courseRef = getFirestore().collection('courses').doc(courseId);
    const courseInfo = await courseRef.get();
    if (!courseInfo.exists) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const userRef = getFirestore().collection('users').doc(uid);
    const userInfo = await userRef.get();
    const student = new UserEntity(userInfo.data());
    const course = new CourseEntity(courseInfo.data());
    let enrolled = false;
    if (course.students.indexOf(student) >= 0) {
      enrolled = true;
    }
    return new GetCourseDto(course, enrolled);
  }

  async enrollCourse(courseId: string, uid: string) {
    const courseRef = getFirestore().collection('courses').doc(courseId);
    const courseInfo = await courseRef.get();
    if (!courseInfo.exists) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const userRef = getFirestore().collection('users').doc(uid);
    const userInfo = await userRef.get();
    const student = new UserEntity(userInfo.data());
    const course = new CourseEntity(courseInfo.data());
    if (course.students.indexOf(student) >= 0) {
      throw new HttpException('You already enrolled!', HttpStatus.BAD_REQUEST);
    }
    const newStudents: UserEntity[] = courseInfo.data().students;
    newStudents.push(student);
    await courseRef.update({
      students: JSON.stringify(newStudents),
    });
    return newStudents;
  }

  async getAllStudents(courseId: string, uid: string): Promise<GetStudentDto> {
    const courseRef = getFirestore().collection('courses').doc(courseId);
    const courseInfo = await courseRef.get();
    const userRef = getFirestore().collection('users').doc(uid);
    const userInfo = await userRef.get();
    const role = userInfo.data().roles;
    if (!courseInfo.exists || role !== 'instructor') {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const course = new CourseEntity(courseInfo.data());
    return new GetStudentDto(course.instructor, course.students);
  }
}
