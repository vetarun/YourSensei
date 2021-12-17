import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { BookService } from '../../../../Shared/Services/book.service';
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-bookread',
  templateUrl: './bookread.component.html',
  styleUrls: ['./bookread.component.scss']
})
export class BookreadComponent implements OnInit {
  loggedInUserDetails: any;
  userID: any;
  userTypeID: any;
  mentor: boolean = false;
  selectedemployeeid: any
  employeeList: any;
  mentorID: any;
  userasmentor: any;
  employeeId: any;
  searchKey: any;
  bookReadEventList: any;
  isInternalMentor: boolean = false;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  displayedColumns: string[] = ['employeeName', 'companyName', 'title', 'completeddate', 'rating'];

  constructor(private employeeService: EmployeeService, private bookService: BookService, private _router: Router, 
    private materialModule: MaterialModule) { }

  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userID = this.loggedInUserDetails.userId;
    this.userTypeID = this.loggedInUserDetails.usertypeid;
    this.mentorID = this.loggedInUserDetails.mentorID;
    this.employeeId = this.loggedInUserDetails.employeeID;
    // this.employeeId = "00000000-0000-0000-0000-000000000000";
    this.isInternalMentor = this.loggedInUserDetails.isInternalMentor;

    debugger;
    if(this.employeeId == null || this.employeeId == "00000000-0000-0000-0000-000000000000" || this.employeeId == undefined){
      this.userasmentor = this.mentorID;
    }
    else {
      this.userasmentor = this.employeeId;
    }
    
    if(this.isInternalMentor){
      this.displayedColumns = ['employeeName', 'title', 'completeddate', 'rating'];
    }

    this.getEmployeeByMentorID();
    this.getBookReadEventByMentorIDAndEmployeeID();
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
    this.getBookReadEventByMentorIDAndEmployeeID();
  }

  getBookReadEventByMentorIDAndEmployeeID(){
    if(this.selectedemployeeid === null || this.selectedemployeeid === undefined){
      this.selectedemployeeid = "00000000-0000-0000-0000-000000000000";
    }

    this.bookService.GetBookReadEventByMentorIDAndEmployeeID(this.userasmentor, true, this.selectedemployeeid).subscribe(res => {
      
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
