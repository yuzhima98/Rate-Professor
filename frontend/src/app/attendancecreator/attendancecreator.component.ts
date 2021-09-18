import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService, NotificationService} from '../_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-attendancecreator',
  templateUrl: './attendancecreator.component.html',
  styleUrls: ['./attendancecreator.component.css']
})
export class AttendancecreatorComponent implements OnInit {
  attendanceCreateForm: FormGroup;
  loading = false;
  submitted = false;
  courseID = '';



  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private attendanceService: AttendanceService,
      private notification: NotificationService,
      private route: ActivatedRoute
      // private subscription: any
  ) {

  }

  ngOnInit() {
    this.attendanceCreateForm = this.formBuilder.group({
      startTime: ['', [Validators.required]],
      startTimeHourMinute: ['', [Validators.required]],
      duration: [30, [Validators.required, Validators.min(10)]],
      accessCode: [Math.floor(Math.random() * 9000000) + 1000000, [Validators.required, Validators.min(1000000), Validators.max(9999999)]],
      course: ['']
    });
    this.route.params.subscribe(params => {
      this.courseID = params.someParam;
    });

      }

  // convenience getter for easy access to form fields
  get f() {
    return this.attendanceCreateForm.controls; }

  onCreate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.attendanceCreateForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    const time: Date = new Date(this.attendanceCreateForm.value.startTime);
    time.setHours(this.attendanceCreateForm.value.startTimeHourMinute.substr(0, 2));
    time.setMinutes(this.attendanceCreateForm.value.startTimeHourMinute.substr(3, 2));
    this.attendanceCreateForm.value.startTime = time;
    this.attendanceCreateForm.value.course = this.courseID;
    //console.log( this.attendanceCreateForm.value);
    this.attendanceService.createAttendance(this.attendanceCreateForm.value).pipe(first())
          .subscribe(
              () => {
                this.router.navigate(['/']);
                this.notification.showNotif('Attendance tracker successfully added', 'confirmation');
              },
              error => {
                console.log('Error:', error);
                this.notification.showNotif(error);
                this.loading = false;
              });

  }

}
