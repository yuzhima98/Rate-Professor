import {Component, OnInit} from '@angular/core';

import {Course} from '../_models/course';
import {NotificationService} from '../_services/notification.service';
import {CourseService} from '../_services/course.service';
import {first} from 'rxjs/operators';
import {Route, Router} from '@angular/router';
import {UserService, AuthService} from '../_services';
import {User} from '../_models/user';
import {Role} from '../_models/role';

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  currentUser: User;

  courses: Course[] = [];
    constructor(
    private courseService: CourseService,
    private userService: UserService,
    private authService: AuthService,
    private notifService: NotificationService,
    private router: Router
  ) {

      // Observing currentUser. We will need it to get user's id.
      this.authService.currentUser.subscribe(x => this.currentUser = x);

    }

  ngOnInit() {
    this.loadAllClasses();
      }


  private loadAllClasses() {

    this.courseService.getAll().subscribe(
      courses => {this.courses = courses; },
        error => {this.notifService.showNotif(error, 'error'); });
  }

  createCourse() {
    this.router.navigate(['/createCourse']);
  }


  trackAttendance() {
    this.router.navigate(['/trackAttendance']);
  }

  get isProf(){
      return this.currentUser.role === Role.professor;
  }

  deleteCourse(id: string) {
    this.courseService.delete(id).pipe(first()).subscribe(() => {
      this.courses = null;
      this.loadAllClasses();
    });
  }

  registerCourse(id: string) {
      this.userService.registerCourse(id).pipe(first()).subscribe(() => {
      this.courses = null;
      this.loadAllClasses();
    });
    }


  createAttendance(id: string) {
      this.router.navigate(['/createAttendance', {someParam: id}]);
  }

  viewStudentAttendances(id: string) {
    this.router.navigate(['/studentAttendances', {courseID: id, studentID: this.currentUser._id}]);
  }

  viewCourseAttendances(id: string) {
    this.router.navigate(['/classAttendances', {courseID: id}]);
  }
}

