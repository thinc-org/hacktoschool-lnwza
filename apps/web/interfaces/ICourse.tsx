import IUser from "./IUser";

export default interface ICourse {
  uid: string;
  title: string;
  description: string;
  instructor: IUser;
  students: IUser[];
}
