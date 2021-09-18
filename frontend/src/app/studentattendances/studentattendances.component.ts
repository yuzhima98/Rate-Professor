import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AttendanceService} from '../_services';
import {ActivatedRoute} from '@angular/router';

export interface PeriodicElement {
  startTime: Date;
  missed: boolean;
}

@Component({
  selector: 'app-studentattendances',
  templateUrl: './studentattendances.component.html',
  styleUrls: ['./studentattendances.component.css']
})
export class StudentattendancesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private attendanceService: AttendanceService) { }

  color = 'red';
  mode = 'determinate';
  temp = [];
  attendanceRate = 0;
  dataSource;
  courseID;
  studentID;

  displayedColumns: string[] = ['startTime', 'missed'];


  //This is used by the Angular Material Table.
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseID = params.courseID;
      this.studentID = params.studentID;
      this.attendanceService.viewStudentAttendances(params.courseID, params.studentID).subscribe(result => {
        const array = this.getArray(result);
        this.dataSource = new MatTableDataSource(array);
        let num = 0;
        let total = 0;
        array.forEach(elem => {
          total++;
          if(!elem.missed){
            num++;
          }
        });
        this.attendanceRate = num / total;
      }, error => {
        console.log(error);
      });
    });

  }

  getArray(input) {
    const ELEMENT_DATA: PeriodicElement[] = [
    ];
    input.forEach(record => {
      const object = {
        startTime: record.startTime,
        missed: record.missed
      };
      ELEMENT_DATA.push(object);
    });
    return ELEMENT_DATA;
  }

}
