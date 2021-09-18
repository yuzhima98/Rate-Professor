import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {AuthGuard} from './_guards/auth.guard';
import {AdminComponent} from './admin/admin.component';

import {AttendancecreatorComponent} from './attendancecreator/attendancecreator.component';
import {StudentattendancesComponent} from './studentattendances/studentattendances.component';
import {ClassattendancesComponent} from './classattendances/classattendances.component';
import {CoursecreatorComponent} from './coursecreator/coursecreator.component';
import {AttendancetrackerComponent} from './attendancetracker/attendancetracker.component';


const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]}, {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.professor] so only admin users can access it.
    data: { roles: [Role.professor] }
  },
  {
    path: 'createCourse',
    component: CoursecreatorComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.professor] }
  },
  {
    path: 'createAttendance',
    component: AttendancecreatorComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.professor] }
  },
  {
    path: 'trackAttendance',
    component: AttendancetrackerComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.student] }
  },
  {
    path: 'studentAttendances',
    component: StudentattendancesComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.professor, Role.student] }
  },
  {
    path: 'classAttendances',
    component: ClassattendancesComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.professor] }
  },

  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
