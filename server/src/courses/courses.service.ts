import { Injectable } from '@nestjs/common';
import Course from './course.entity';
import {getFirestore} from 'firebase-admin/firestore';

@Injectable()
export class CoursesService {
    private readonly courses: Course[]=[];
    async findAll(): Promise<Course[]> {
        const snapshot = await getFirestore().collection('courses').get();
        snapshot.forEach((doc) => {
            this.courses.push({
                id: doc.id,
                Title: doc.get('Title'),
                Comments: doc.get('Comments')
            });
        });
        return this.courses;
    }
}

