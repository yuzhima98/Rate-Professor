
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    console.log('getAll()');
    return this.http.get<User[]>(`http://localhost:4000/user/allusers`);
  }



  register(user: User) {
    return this.http.post(`http://localhost:4000/user/register`, user);
  }


  registerCourse(id: string) {
    return this.http.post(`http://localhost:4000/user/registercourse`, {courseid: id});
  }




}
