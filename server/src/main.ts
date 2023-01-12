import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { initializeApp } from 'firebase/app';

async function bootstrap() {
  var admin = require("firebase-admin");
  const firebaseConfig = require('../firebaseConfig.json');
  var serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  initializeApp(firebaseConfig);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
