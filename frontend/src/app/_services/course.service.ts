
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../_models/course';




@Injectable({ providedIn: 'root' })
export class CourseService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log('getAll()');
        return this.http.get<Course[]>(`http://localhost:4000/course/getcourses`);
    }



    getEnrolledStudents(courseID: string) {
        return this.http.get<any>(`http://localhost:4000/course/getstudents${courseID}`);
    }


    delete(id: string) {
        return this.http.delete(`http://localhost:4000/course/${id}`);

    }

    createCourse(course: Course) {
        return this.http.post(`http://localhost:4000/course/addcourse`, course);
    }

}
