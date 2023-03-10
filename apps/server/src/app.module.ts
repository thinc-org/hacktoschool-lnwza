import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CoursesController } from "./courses/courses.controller";
import { CoursesModule } from "./courses/courses.module";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { ValidateMiddleware } from "./validate.middleware";

@Module({
  imports: [CoursesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateMiddleware)
      .exclude(
        { path: "courses", method: RequestMethod.GET },
        { path: "courses/:courseId", method: RequestMethod.GET },
      )
      .forRoutes(UsersController, CoursesController);
  }
}
