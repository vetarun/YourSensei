import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { TrainingEventService } from '../../../../Shared/Services/training-event.service';

@Component({
  selector: 'app-studenttrainingeventlist',
  templateUrl: './studenttrainingeventlist.component.html',
  styleUrls: ['./studenttrainingeventlist.component.scss']
})
export class StudenttrainingeventlistComponent implements OnInit {

  loggedInUserDetails: any;
  userID: any;
  userTypeID: any;
  mentor: boolean = false;
  employeeList: any;
  mentorID: any;
  employeeId: any;
  searchKey: any;
  userasmentor: any;
  trainingEventList: any = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  displayedColumns: string[] = ['bannerimageurl', 'eventName', 'eventFormat', 'instructorName', 'startDate', 'action'];
  
  constructor(private employeeService: EmployeeService, private _router: Router, private trainingEventService: TrainingEventService,
    private materialModule: MaterialModule) { }

  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userID = this.loggedInUserDetails.userId;
    this.userTypeID = this.loggedInUserDetails.usertypeid;
    this.mentorID = this.loggedInUserDetails.mentorID;
    this.employeeId = this.loggedInUserDetails.employeeID;
    // this.employeeId = "00000000-0000-0000-0000-000000000000";

    if(this.employeeId == null || this.employeeId == "00000000-0000-0000-0000-000000000000" || this.employeeId == undefined){
      this.userasmentor = this.mentorID;
    }
    else {
      this.userasmentor = this.employeeId;
    }
    //this.getEmployeeByMentorID();
    this.getTrainingEventAttendeeByMentorIDAndEmployeeID();
  }

  // getEmployeeByMentorID(){
  //   this.employeeService.GetEmployeeByMentorID(this.mentorID).subscribe(res => {
  //     this.employeeList = res;
  //   })
  // }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  // searchByEmployeeID(){
  //   this.getTrainingEventAttendeeByMentorIDAndEmployeeID();
  // }

  getTrainingEventAttendeeByMentorIDAndEmployeeID(){
    this.trainingEventService.GetTrainingEventAttendeeByMentorIDAndEmployeeID(this.userasmentor, true, this.employeeId).subscribe(res => {
      res.forEach(element => {
        if(this.trainingEventList !== null){
          var found = this.trainingEventList.some(a => a.trainingEventID === element.trainingEventID);
          if(!found){
            this.trainingEventList.push(element);
          }
        }
        else{
          this.trainingEventList.push(element);
        }
      });

      this.dataSource = new MatTableDataSource(this.trainingEventList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
