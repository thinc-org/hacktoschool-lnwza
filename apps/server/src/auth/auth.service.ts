import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  async validate(ticket: string): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService
        .get("https://sso.thinc.in.th/serviceValidation", {
          headers: {
            DeeAppId: "APPID",
            DeeAppSecret: "APPSECRET",
            DeeTicket: ticket,
            "Accept-Encoding": "*",
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw "An error happened!";
          }),
        ),
    );
    const userData = {
      uid: data.uid,
      ouid: data.ouid,
      name: data.firstname + " " + data.lastname,
      roles: "instructor",
      photoURL: "https://sv1.img.in.th/UUryV3.png",
    };
    const { uid, ...user } = userData;
    const db = getFirestore();
    const userRef = db.collection("users").doc(userData.uid);
    const userInfo = await userRef.get();
    if (!userInfo.exists) {
      userRef.set(user);
    } else {
      const userDb = userInfo.data();
      if (userDb.name !== userData.name) {
        throw new HttpException("Same uid", HttpStatus.BAD_REQUEST);
      }
    }
    let token: string;
    await getAuth()
      .createCustomToken(uid, user)
      .then((customToken) => {
        token = customToken;
      })
      .catch((error) => {});
    return token;
  }
}
