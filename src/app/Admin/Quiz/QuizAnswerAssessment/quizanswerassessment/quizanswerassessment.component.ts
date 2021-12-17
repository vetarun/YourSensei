import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { QuizService } from '../../../../Shared/Services/quiz.service';

@Component({
  selector: 'app-quizanswerassessment',
  templateUrl: './quizanswerassessment.component.html',
  styleUrls: ['./quizanswerassessment.component.scss']
})
export class QuizanswerassessmentComponent implements OnInit {
  loggedInUserDetails: any;
  userID: any;
  userTypeID: any;
  mentor: boolean = false;
  employeeList: any;
  mentorID: any;
  userasmentor: any;
  selectedemployeeid: any;
  employeeId: any;
  searchKey: any;
  bookReadEventList: any;
  hasRecords: boolean = false;
  isInternalMentor: boolean = false;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  displayedColumns: string[] = ['employeeName', 'companyName', 'quiz', 'title', 'answeredDate', 'action'];
  
  constructor(private quizService: QuizService, private employeeService: EmployeeService, private _router: Router, 
    private materialModule: MaterialModule) { }

  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userID = this.loggedInUserDetails.userId;
    this.userTypeID = this.loggedInUserDetails.usertypeid;
    this.mentorID = this.loggedInUserDetails.mentorID;
    this.isInternalMentor = this.loggedInUserDetails.isInternalMentor;
    // this.employeeId = "00000000-0000-0000-0000-000000000000";
    this.employeeId = this.loggedInUserDetails.employeeID;
    
    if(this.isInternalMentor){
      this.displayedColumns = ['employeeName', 'quiz', 'title', 'answeredDate', 'action'];
    }


    if(this.employeeId == null || this.employeeId == "00000000-0000-0000-0000-000000000000" || this.employeeId == undefined){
      this.userasmentor = this.mentorID;
    }
    else {
      this.userasmentor = this.employeeId;
    }

    this.getEmployeeByMentorID();
    this.getQuizByMentorIDAndEmployeeID();
  }

  getEmployeeByMentorID(){
    debugger;
    this.employeeService.GetEmployeeByMentorID(this.userasmentor).subscribe(res => {
      this.employeeList = res;
    })
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  searchByEmployeeID(){
    this.getQuizByMentorIDAndEmployeeID();
  }

  getQuizByMentorIDAndEmployeeID(){
    if(this.selectedemployeeid === null || this.selectedemployeeid === undefined){
      this.selectedemployeeid = "00000000-0000-0000-0000-000000000000";
    }

    this.quizService.GetQuizByMentorIDAndEmployeeID(this.userasmentor, true, this.selectedemployeeid).subscribe(res => {
      
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
