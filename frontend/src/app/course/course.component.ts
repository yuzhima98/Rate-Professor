import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Course} from '../_models/course';
import {NotificationService, AuthService} from '../_services';
import {Role} from '../_models/role';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-component',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() registerEvent = new EventEmitter<string>();
  @Output() createAttendanceEvent = new EventEmitter<string>();
  @Output() courseAttendancesEvent = new EventEmitter<string>();
    @Output() studentAttendancesEvent = new EventEmitter<string>();

     registeredList: string[];
     userRole = '';


  get isProf() {
      return this.userRole && this.userRole === Role.professor;
  }
    register(id) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if(user.courses.length < 5){
            this.authService.addCourseId(id);
        }
        this.registerEvent.emit(id);
    }
  get isRegistered() {
      //console.log(111);
      const user = JSON.parse(localStorage.getItem('currentUser'));
      return user.courses.includes(this.course._id);
  }
   constructor(private notifService: NotificationService, private authService: AuthService, ) {}


  ngOnInit() {
    this.authService.currentUser.subscribe(x => {
        if (x) {
        this.registeredList = x.courses;
        this.userRole = x.role;
        }}

        );
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }


  attendance(id) {
      this.createAttendanceEvent.emit(id);
  }


    // this is for the prof
    viewCourseAttendances(id: string) {
        this.courseAttendancesEvent.emit(id);
    }

    // this is for the student
    viewStudentAttendances(id: string) {
        this.studentAttendancesEvent.emit(id);
    }
}
