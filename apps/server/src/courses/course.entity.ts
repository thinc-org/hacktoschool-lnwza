import { UserEntity } from "src/users/user.entity";

export class CourseEntity {
  uid: string;
  title: string;
  description: string;
  instructor: UserEntity;
  students: UserEntity[];
  constructor(partial: Partial<CourseEntity>) {
    Object.assign(this, partial);
  }
}
export default CourseEntity;
