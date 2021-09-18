import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_services/notification.service';
import { CourseService } from '../_services/course.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-coursecreator',
  templateUrl: './coursecreator.component.html',
  styleUrls: ['./coursecreator.component.css']
})

export class CoursecreatorComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];


  constructor(
      // private patternValidator: PatternValidator,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private courseService: CourseService,
      private notification: NotificationService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      courseNumber: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      courseDept: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      courseDescription: ['', [Validators.required]]
    });

    this.roles = [{name: 'Student'},
      {name: 'Professor'}];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.courseService.createCourse(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              //  this.alertService.success('Registration successful', true);
              this.router.navigate(['/']);
              this.notification.showNotif('Course Successfully added', 'confirmation');
            },
            error => {
              console.log('Error:', error);
              this.notification.showNotif(error);
              this.loading = false;
            });
  }
}
