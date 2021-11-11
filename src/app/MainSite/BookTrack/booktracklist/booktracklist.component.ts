import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSlideToggleChange, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../Shared/Services/book.service';
import { EmployeeService } from '../../../Shared/Services/employee.service';

@Component({
  selector: 'app-booktracklist',
  templateUrl: './booktracklist.component.html',
  styleUrls: ['./booktracklist.component.scss']
})
export class BooktracklistComponent implements OnInit {
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
  searchBar_Width: string;
  companyuser: boolean = false;
  companyadmin: boolean = false;
  mentor: boolean = false;
  superadmin: boolean = false;
  searchKey;
  employeeslist: any=[];
  search_width: string;
  constructor(private SpinnerService: NgxSpinnerService,private empservice:EmployeeService,private bookService:BookService,private toaster:ToastrService, private _router: Router) { }

  ngOnInit() {

    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.companyid = this.companydetails.companyId
    this.usertypeid = this.companydetails.usertypeid;
    this.searchBar_Width = "search-div col-sm-10";
   
    this.search_width = "col-sm-5";
    if (this.usertypeid == '5c37cf64-f617-4399-bb68-645b0c3969a2') {
      this.companyuser = true;
      this.search_width = "col-sm-10";
    }
    else if (this.usertypeid == '99f9aeb1-9be6-4e82-8671-ca3df4df16cb') {
      this.companyadmin = true;
    }
    else if (this.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e') {
      this.individual = true;
    }
    else if (this.usertypeid == '4ba19173-94cd-4222-af7c-60c91d446f8e') {
      this.superadmin = true;
    }
    else if(this.usertypeid == "c6156716-6d16-4e75-9660-056a59b7b546" || this.usertypeid == "2d2e4aec-d852-417a-8a54-fe80504d83eb"){
      this.mentor = true;
      this.search_width = "col-sm-10";
      this.searchBar_Width = "search-div col-sm-10";
    }
    this.getBookTrackLIst();
    this.GetEmployee();
  }
  getBookTrackLIst() {
this.SpinnerService.show();
   this.bookService.GetTrackList(this.userid,this.companyid,this.individual).subscribe(res=>{
    this.SpinnerService.hide()
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
  GetEmployee() {
    this.empservice.GetAllEmployee(this.companydetails.companyId).subscribe(res => {

      this.employeeslist = []
      this.employeeslist = res;
      console.log(this.employeeslist)
    })

  }
  addtrack(){
    this._router.navigateByUrl('/Main/track')
  }

  EditTrack(id) {
    if (id.trackid != null) {
        this._router.navigate(['/Main/track'], { queryParams: { id: id.trackid } });

    }
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

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  searchbyemployee(){

  }
  inUseToggle($event: MatSlideToggleChange,trackid) {
    this.bookService.ChangeInUSeTRack(trackid,$event.checked).subscribe(res=>{
      if(res.code == 200){
       this.ngOnInit();
  
      }
    })
  } 
}
