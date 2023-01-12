import { Injectable } from '@nestjs/common';
import Course from './course.entity';
import {getFirestore} from 'firebase-admin/firestore';

@Injectable()
export class CoursesService {
    private readonly courses: Course[]=[];
    async findAll(): Promise<Course[]> {
        const course = getFirestore().collection('courses').doc('MI2gg4ze7kOsqddNonDc');
        const doc = await course.get();
        console.log(doc.data());
        return this.courses;
    }
}

