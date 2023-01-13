import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {AxiosError} from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { getAuth } from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  async validate(ticket: string): Promise<string> {
    const {data}= await firstValueFrom(
        this.httpService.get('https://sso.thinc.in.th/serviceValidation', {
            headers: {
                'DeeAppId': 'APPID',
                'DeeAppSecret': 'APPSECRET',
                'DeeTicket': ticket,
                'Accept-Encoding': '*'
            }
        }).pipe(
            catchError((error: AxiosError) => {
                console.log(error);
                throw 'An error happened!';
        }),
    ));
    const userData = { uid: data.uid, ouid: data.ouid, name: data.firstname+' '+data.lastname };
    const { uid, ...user } = userData;
    const db = getFirestore();
    const userRef = db.collection('users').doc(userData.uid);
    const userInfo = await userRef.get();
    if (!userInfo.exists) {
        const res = userRef.set(user);
    }
    let token: string;
    await getAuth().createCustomToken(uid, user).then(customToken => {
        token=customToken;
    }).catch(error => {
          console.log('Error creating custom token:', error);
    });
    return token;
  }
}