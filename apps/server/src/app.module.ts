import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ValidateMiddleware } from './validate.middleware';

@Module({
  imports: [CoursesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
