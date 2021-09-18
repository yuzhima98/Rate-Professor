import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService, NotificationService} from '../_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-attendancetracker',
  templateUrl: './attendancetracker.component.html',
  styleUrls: ['./attendancetracker.component.css']
})
export class AttendancetrackerComponent implements OnInit {
  attendanceTrackerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private attendanceService: AttendanceService,
      private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.attendanceTrackerForm = this.formBuilder.group({
      accessCode: ['', [Validators.required]],
    });
  }

  get f() {
    return this.attendanceTrackerForm.controls; }

  onCreate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.attendanceTrackerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }
    this.attendanceService.trackAttendance(this.attendanceTrackerForm.value.accessCode).pipe(first())
        .subscribe(
            () => {
              this.router.navigate(['/']);
              this.notification.showNotif('Attendance confirmed!', 'confirmation');
            },
            error => {
              this.router.navigate(['/']);
              console.log('Error:', error);
              this.notification.showNotif(error);
              this.loading = false;
            });

  }
}
