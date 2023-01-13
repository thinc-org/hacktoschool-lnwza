import { UserEntity } from 'src/users/user.entity';

export class GetStudentDto {
  instructor: UserEntity;
  students: UserEntity[];
  constructor(instructor: UserEntity, students: UserEntity[]) {
    this.instructor = instructor;
    this.students = students;
  }
}
