import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService, CourseService} from '../_services';

export interface PeriodicElement {
  username: string;
  firstName: string;
  lastName: string;
  attendanceRate: number;
  id: number;
}

@Component({
  selector: 'app-classattendances',
  templateUrl: './classattendances.component.html',
  styleUrls: ['./classattendances.component.css']
})
export class ClassattendancesComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute,
              private attendanceService: AttendanceService, private courseService: CourseService) {
  }

  report = [];
  courseID = '';
  students = [];
  courseAttendances = [];


  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'attendanceRate', 'id'];
  dataSource;

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.courseID = params.courseID;
      this.courseService.getEnrolledStudents(this.courseID).subscribe(result => {
        this.attendanceService.viewCourseAttendances(this.courseID).subscribe(attendance => {
          this.students = result;
          this.courseAttendances = attendance;
          console.log(attendance);
          this.dataSource = this.producePerPersonaAttendanceReport();
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });

    });

  }


  producePerPersonaAttendanceReport() {
    const ELEMENT_DATA: PeriodicElement[] = [
    ];
    let record;
    const attendanceSize = this.courseAttendances.length;
    this.students.forEach(student => {
      let studentAttendNum = 0;
      this.courseAttendances.forEach(attendance => {
          if (attendance.users.includes(student._id)) {
            studentAttendNum++;
          }
      });
      record = {
        username: student.username,
        firstName: student.firstName,
        lastName: student.lastName,
        attendanceRate: studentAttendNum / attendanceSize,
        id: student.id
      };
      ELEMENT_DATA.push(record);
    });
    return ELEMENT_DATA;
  }

  navigateToStudent(id) {
    this.router.navigate(['/studentAttendances', {courseID: this.courseID, studentID: id}]);
  }


}


