import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { TrainingEventService } from '../../../../Shared/Services/training-event.service';

@Component({
  selector: 'app-kaizen-board',
  templateUrl: './kaizen-board.component.html',
  styleUrls: ['./kaizen-board.component.scss']
})
export class KaizenBoardComponent implements OnInit {

  loggedInUserDetails: any;
  userID: any;
  userTypeID: any;
  mentor: boolean = false;
  employeeList: any;
  companyID: any;
  employeeId: any;
  searchKey: any;
  kaizenBoardList: any = [];
  dataSource: MatTableDataSource<any>; 
  isInternalMentor:boolean
  companydetails:any
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  displayedColumns: string[] =['trainingEventName', 'trainingEventFormat',
   'startDate','leader','intials','idea','plan','do','check','act',
   'complete','dollarImpacted','notes'];
  
  constructor(private employeeService: EmployeeService,
     private _router: Router, private trainingEventService: TrainingEventService,
    private materialModule: MaterialModule) {
      this.companydetails=localStorage.getItem('companyDetails')
      this.companydetails=JSON.parse(this.companydetails)
      this.isInternalMentor = this.companydetails.isInternalMentor;
     }

  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userID = this.loggedInUserDetails.userId;
    this.userTypeID = this.loggedInUserDetails.usertypeid;
    this.companyID = this.loggedInUserDetails.companyId;
    this.employeeId = "00000000-0000-0000-0000-000000000000";
    
    //this.getEmployeeByMentorID();
    this.GetKaizenBoard();
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

  GetKaizenBoard(){
    this.trainingEventService.GetKaizenBoard(this.companyID).subscribe(res => {
     console.log(res)
      res.forEach(element => {
        this.kaizenBoardList.push(element);
      });

      this.dataSource = new MatTableDataSource(this.kaizenBoardList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}

