import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../Shared/Services/book.service';
import { EmployeeService } from '../../../Shared/Services/employee.service';

@Component({
     selector: 'app-mentortrackcategory',
     templateUrl: './mentortrackcategory.component.html',
     styleUrls: ['./mentortrackcategory.component.scss']
})
export class MentortrackcategoryComponent implements OnInit {
  displayedColumns: string[] =
  [
    'trackName',
    'categorySequesnce',
    // 'isActive',
     'isDefault',
    'action'
  ];
dataSource: MatTableDataSource<any>;
@ViewChild(MatSort, { static: true }) sort: MatSort
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  companydetails: any;
  userid: any;
  companyid: any;
  isRead :boolean;
  individual: boolean=false;
  usertypeid: string;
  employeeslist: any=[];
  mentor : boolean = false;
  employeeList: any;
  mentorID: any;
  value: any;
  searchKey: any;
  search_width: string;
  searchBar_Width: string;
  companyuser: boolean = false;
  defaultstudent: any
  student_1: any;
  selectdefault: any;
    constructor(private spinner:NgxSpinnerService,private employeeService:EmployeeService, private bookService:BookService,private toaster:ToastrService, private _router: Router) { }

  ngOnInit() {

    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.companyid = this.companydetails.companyId
    this.usertypeid = this.companydetails.usertypeid;
    this.mentorID = this.companydetails.mentorID;
    this.searchBar_Width = "search-div col-sm-10";
    this.search_width = "col-sm-5";
   if (this.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e') {
      this.individual = true;
    }
    // else this.search_width = "col-sm-5";
    // if (this.usertypeid == '5c37cf64-f617-4399-bb68-645b0c3969a2') {
    //   this.companyuser = true;
    //   this.search_width = "col-sm-10";
    // }
  else if(this.usertypeid == "c6156716-6d16-4e75-9660-056a59b7b546" || this.usertypeid == "2d2e4aec-d852-417a-8a54-fe80504d83eb"){
      this.mentor = true;
     // this.searchBar_Width = "search-div col-sm-12";
    }
    this.getBookTrackLIst();
    this.GetStudents();
  }
  getBookTrackLIst() {
this.spinner.show()
   this.bookService.GetTrackList(this.userid,this.companyid,this.individual).subscribe(res=>{
     this.spinner.hide()
    res.forEach(function (value) {
        
     
     for(var i=0;i<value.categorySequesnce.length;i++){
      value.categorySequesnce[i].bookinitials = value.categorySequesnce[i].bookinitials.split("-")[0] +  value.categorySequesnce[i].bookinitials.split("-")[1]
     }
    });
    this.dataSource = new MatTableDataSource(res);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
   })
  }

  GetStudents() {
  
    this.employeeService.GetEmployeeByMentorID(this.mentorID).subscribe(res => {
      console.log(res)
      this.employeeList = []
      this.employeeList = res;
      this.selectdefault = this.employeeList[0];
      if(this.selectdefault.userId != null){
        this.defaultstudent = this.selectdefault.firstName + " " + this.selectdefault.lastName;
        console.log(this.selectdefault.firstName + "" + this.selectdefault.lastName)
      }
    })
  }

  // SelecteStudent(e, type){

  //     this.value = e
  //     if (e != null) {
  //      this.userid = e
  //     }
  //   }

  addtrack(){
    this._router.navigateByUrl('/Main/addstudents')
  }

  EditTrack(id) {
    if (id.trackid != null) {
        this._router.navigate(['/Main/addstudents'], { queryParams: { id: id.trackid } });

    }
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  DeleteTrack(id) {
    if (id.trackid != null) {      
      if (confirm('Are you sure to delete this track record?')) {
        this.bookService.DeleteTrack(id.trackid).subscribe(res => {
          if (res.code == 200) {
            this.toaster.success(res.message)
            location.reload();
          }
        }, err => {
          this.toaster.error(err.message)
        })
      }
      //this._router.navigate(['/Main/track'], { queryParams: { id: id.trackid } });
    }
  }
}

