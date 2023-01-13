import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

@Injectable()
export class ValidateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token) {
      getAuth()
        .verifyIdToken(token.replace("Bearer ", ""))
        .then((decodedToken) => {
          req["user"] = {
            uid: decodedToken.uid,
          };
          next();
        })
        .catch((error) => {
          console.log(error);
          ValidateMiddleware.accessDenied(req.url, res);
        });
    } else {
      ValidateMiddleware.accessDenied(req.url, res);
    }
  }
  private static accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: "access denied",
    });
  }
}
