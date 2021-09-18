
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


import {Attendance} from '../_models/attendance';




@Injectable({ providedIn: 'root' })
export class AttendanceService {
    constructor(private http: HttpClient) { }

    viewStudentAttendances(courseID: string, studentID: string) {
        return this.http.get<any>(`http://localhost:4000/attendance/student${courseID}/${studentID}`);
    }

    viewCourseAttendances(courseID: string) {
        return this.http.get<any>(`http://localhost:4000/attendance/prof${courseID}`);
    }


    trackAttendance(accessCode: number) {
        return this.http.post(`http://localhost:4000/attendance/track`, {accessCode});
    }

    createAttendance(attendance: Attendance) {
        return this.http.post(`http://localhost:4000/attendance/add`, attendance);
    }

    delete(id: string) {
        return this.http.delete(`http://localhost:4000/attendance/${id}`);
    }
}
