import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import {MaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';

import { AttendancecreatorComponent } from './attendancecreator/attendancecreator.component';
import { StudentattendancesComponent } from './studentattendances/studentattendances.component';
import { ClassattendancesComponent } from './classattendances/classattendances.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CoursecreatorComponent } from './coursecreator/coursecreator.component';
import { AttendancetrackerComponent } from './attendancetracker/attendancetracker.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CourseComponent,
    RegisterComponent,
    AdminComponent,

    AttendancecreatorComponent,
    StudentattendancesComponent,
    ClassattendancesComponent,
    CoursecreatorComponent,
    AttendancetrackerComponent

  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        NgxMaterialTimepickerModule
    ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
