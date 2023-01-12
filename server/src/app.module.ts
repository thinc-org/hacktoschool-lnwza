import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
