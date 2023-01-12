import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {AxiosError} from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { getAuth } from 'firebase-admin/auth';

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
    const { uid, ...user } = { 
        uid: data.uid, 
        ouid: data.ouid, 
        firstname: data.firstname, 
        lastname: data.lastname 
    };
    let token: string;
    await getAuth().createCustomToken(uid, user).then(customToken => {
        token=customToken;
    }).catch(error => {
          console.log('Error creating custom token:', error);
    });
    return token;
  }
}
