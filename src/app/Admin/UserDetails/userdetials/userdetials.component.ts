import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from '../../../Shared/Services/authentication.service';
import { CompanyDetailService } from '../../../Shared/Services/companydetail.service';
import { MaterialModule } from '../../../Shared/modules/material.module';


@Component({
  selector: 'app-userdetials',
  templateUrl: './userdetials.component.html',
  styleUrls: ['./userdetials.component.scss']
})
export class UserdetialsComponent implements OnInit {
  superadmin: boolean = false;
  companydetails: any;
  mentor: boolean = false;
  mentorID
  userid
  companyid
  userRole
  usertypeid : any;
  companylist: Object;
  searchBar_Width: any;
  searchKey
  displayedColumns: string[] =
    [
      'email',
      'firstname',
      'lastname',
      'company',
      'lastcreditearn',
      'totalcredit',
      'totala3',
      'totalkaizen',
      'beltname'
    ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  search_width: string;
  constructor(private authenticationService: AuthenticationService, private companyDetailservice: CompanyDetailService, private materialModule: MaterialModule) { }

  ngOnInit() {
    
     this.fetchCompanyList();
     //this.cleartext();
     this.getuserdetails(null);
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.userRole = this.companydetails.roles;
    this.companyid = this.companydetails.companyId
    this.usertypeid = this.companydetails.usertypeid;
    this.mentorID = this.companydetails.mentorID;
    this.mentor = false;
    this.searchBar_Width = "search-div col-sm-12";

    if (this.usertypeid == '4ba19173-94cd-4222-af7c-60c91d446f8e') {
      this.superadmin = true;
    }
    this.search_width = "col-sm-12";
    if (this.superadmin) {
      this.displayedColumns = ['email', 'firstname', 'lastname', 'company', 'totalcredit', 'totala3', 'totalkaizen', 'beltname'];
      this.search_width = "col-sm-5";
    }
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  searchbycompanyid(companyid) {
    this.getuserdetails(companyid);
  }

  fetchCompanyList() {
    this.companyDetailservice.GetAllCompanies().subscribe(res => {
      this.companylist = res
      //console.log(res);
    })
  }
  changecompany(e){
 this.companyid = e
  }

  getuserdetails(companyId) {
    this.dataSource = new MatTableDataSource();

    this.authenticationService.GetUserDetails(companyId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
     // this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
