import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject,  Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {






  // tslint:disable-next-line:max-line-length
  /*BehaviorSubject is a type of subject, a subject is a special type of observable so you can subscribe to messages like any other observable. The unique features of BehaviorSubject are:

    It needs an initial attendanceRate as it must always return a attendanceRate on subscription even if it hasn't received a next()
    Upon subscription, it returns the last attendanceRate of the subject. A regular observable only triggers when it receives an onnext
    at any point, you can retrieve the last attendanceRate of the subject in a non-observable code using the getValue() method.

Unique features of a subject compared to an observable are:

    It is an observer in addition to being an observable so you can also send values to a subject in addition to subscribing to it.

In addition, you can get an observable from behavior subject using the asObservable() method on BehaviorSubject. */
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this is used by app.component.ts
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:4000/user/authenticate`, { username, password })
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
             // user.courses = [];
            // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          console.log("user is", user);
          return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  addCourseId(id: string) {
   const user = JSON.parse(localStorage.getItem('currentUser'));
   user.courses.push(id);
   localStorage.setItem('currentUser', JSON.stringify(user));
   this.currentUserSubject.next(user);
  }
}
