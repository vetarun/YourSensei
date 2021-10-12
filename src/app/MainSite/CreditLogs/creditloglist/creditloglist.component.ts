import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from '../../../Shared/Services/authentication.service';
import { CompanyDetailService } from '../../../Shared/Services/companydetail.service';
import { CreditlogService } from '../../../Shared/Services/creditlog.service';


@Component({
  selector: 'app-creditloglist',
  templateUrl: './creditloglist.component.html',
  styleUrls: ['./creditloglist.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreditloglistComponent implements OnInit {
  companydetails: any;
  companyid: any;
  searchKey: any;
  companylist: any;
  mentoremployeeslist: any=[];
  userid: any;
  searchuserid: any;
  MentorsEmployee: Object;
  totallog: any;
  displayedColumns: string[] = ['empCode', 'firstName', 'lastName', 'event', 'awardedDate', 'credit'];
  dataSource: MatTableDataSource<any>;
  DetailLogdisplayedColumns: string[] = [ 'event', 'awardedDate', 'credit'];
  DetailLogdataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) set sort(v: MatSort) {this.dataSource.sort = v;}
  @ViewChild(MatPaginator, { static: false }) set paginator(v: MatPaginator){this.dataSource.paginator = v;} 
  CompanyForm: FormGroup
  superadminview: boolean = false;
  isListAvailabe: boolean = false;
  constructor(private creditService: CreditlogService, private _formBuilder: FormBuilder, private authservice: AuthenticationService, private companyDetailService: CompanyDetailService) { }
  
  ngOnInit() {
    
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.companyid = this.companydetails.companyId
    this.userid = this.companydetails.userId
    this.searchuserid = "All";
    this.ShowEmployeesDropdown();

    //this.fetchCompanyList();
   
if(this.companydetails.userTypeName=='Company Admin' || this.companydetails.userTypeName=='Super Admin'){
  this.getloglist();
}
if(this.companydetails.userTypeName=='Company User' || this.companydetails.userTypeName=='Individual'){
  this.getloglistbyuser();
} 
  }
  getloglist() {
    this.displayedColumns =  ['empCode', 'firstName', 'lastName',  'sumOfLogs','action'];
    this.creditService.GetCreditLogsByCompanyID(this.companyid).subscribe(res => {
      if (res.length) {
        this.isListAvailabe = true
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  detailsLogs(element){
    this.dataSource.data.forEach(field => {
      if (field != element) {
        
        field.isExpanded = false;
      }
    });
    element.isExpanded = !element.isExpanded;
    this.DetailLogdataSource = new MatTableDataSource(element.listOfLogsForuser)
    this.DetailLogdataSource.sort = this.sort;
    this.DetailLogdataSource.paginator = this.paginator;
  }

  getloglistbyuser() {
    this.creditService.GetCreditLogsByLoggedInUser(this.userid, true).subscribe(res => {
      if (res.listOflogs.length) {
        this.isListAvailabe = true
        this.dataSource = new MatTableDataSource(res.listOflogs)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totallog = res.sumOfCredits
      }
      
    })
  }



  fetchCompanyList() {
    this.companyDetailService.GetAllCompanies().subscribe(res => {
      this.companylist = res
     
    })
  }


  fetchAllEmployeesOfMentor() {
    
    this.authservice.GetAllEmployeeFromMentor(this.userid).subscribe(res => {
    
      this.mentoremployeeslist = res
     
    })
  }



  ShowEmployeesDropdown() {
    this.creditService.ShowMentorsEmployee(this.userid).subscribe(res => {
      
      this.MentorsEmployee = res
      if (this.MentorsEmployee) {
        this.fetchAllEmployeesOfMentor();
      }
    })
  }


  searchbycompanyid() {
    this.getloglist();
  }

  searchbyemployee() {

    
    this.creditService.GetCreditLogsByLoggedInUser(this.searchuserid, true).subscribe(res => {
      if (res.listOflogs.length) {
        this.isListAvailabe = true
        this.dataSource = new MatTableDataSource(res.listOflogs)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totallog = res.sumOfCredits
      }
      else{
        this.isListAvailabe=false
      }

    })




    console.log(this.searchuserid)
  }



  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  Clearsearch() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
