import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class UsersService {
  async getUser(uid: string): Promise<UserEntity> {
    const userRef = getFirestore().collection('users').doc(uid);
    const userInfo = await userRef.get();
    return new UserEntity(userInfo.data());
  }
}
