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
  employeeList: any;
  mentorID: any;
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
    this.employeeId = "00000000-0000-0000-0000-000000000000";
    this.isInternalMentor = this.loggedInUserDetails.isInternalMentor;
    
    if(this.isInternalMentor){
      this.displayedColumns = ['employeeName', 'title', 'completeddate', 'rating'];
    }

    this.getEmployeeByMentorID();
    this.getBookReadEventByMentorIDAndEmployeeID();
  }

  getEmployeeByMentorID(){
    this.employeeService.GetEmployeeByMentorID(this.mentorID).subscribe(res => {
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
    if(this.employeeId === null || this.employeeId === undefined){
      this.employeeId = "00000000-0000-0000-0000-000000000000";
    }

    this.bookService.GetBookReadEventByMentorIDAndEmployeeID(this.mentorID, true, this.employeeId).subscribe(res => {
      
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
