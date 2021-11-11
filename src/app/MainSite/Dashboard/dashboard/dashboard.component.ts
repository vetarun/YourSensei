import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { DashboardService } from '../../../Shared/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  companydetails: any;
  companyid: any;
  userid: any;
  employeeid: any;
  data: any = {};
  youarehere: any;
  CreditStandings: any = []
  searchKey: any;
  beltwidth: any = [100]
  displayedColumns: string[] =
    [
      'employeeName',
      'mentorName',
      'belt',
      'ciCredits',
      'cilastweek',
      'dollarImpacted'
    ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  userTypeId: any;
  CICredits: number;
  commingbeltDetail: any;
  mentorid: any;

  ismentor: boolean=false;
  totalcredit: any;

  constructor(private DashboardService: DashboardService) { }

  ngOnInit() {

    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.employeeid = this.companydetails.employeeID
    this.companyid = this.companydetails.companyId
    this.userTypeId = this.companydetails.usertypeid
    this.mentorid = this.companydetails.mentorID
    if (this.userTypeId == "c6156716-6d16-4e75-9660-056a59b7b546" ||this.userTypeId == "2d2e4aec-d852-417a-8a54-fe80504d83eb") {
      this.ismentor = true;
    }
    this.getDashboardData();
    this.GetCreditStandings();
  }

  getDashboardData() {

    
    this.DashboardService.GetDashboardBeltDetails(this.companyid, this.userid, this.employeeid,this.ismentor).subscribe(res => {
      // console.log(res)
      this.data = res;
      this.youarehere = this.data.indexofyouarehere;
      this.totalcredit = this.data.totalcredit
      this.commingbeltDetail = this.data.youareheredetail
      for (var i = 0; i < this.data.listOfBelt.length-1; i++) {
        this.beltwidth.push(this.beltwidth[i] + 50)
      }
    })
  }


  GetCreditStandings() {

    if(this.userTypeId.toUpperCase() == 'FBDE320E-6619-4F25-9E7F-2FCC94D2879E'){
      this.userid = this.userid       
    } else if(this.userTypeId.toLowerCase()== "c6156716-6d16-4e75-9660-056a59b7b546" || this.userTypeId.toLowerCase() == '2d2e4aec-d852-417a-8a54-fe80504d83eb'){
      this.userid = this.userid 
    }else{
      this.userid = '00000000-0000-0000-0000-000000000000'
    }

    // if(this.userTypeId.toUpperCase()=='99F9AEB1-9BE6-4E82-8671-CA3DF4DF16CB'){
    //   this.userid='00000000-0000-0000-0000-000000000000'
    // }
    this.DashboardService.GetCreditStandings(this.companyid, this.userid,this.ismentor).subscribe(res => {
      console.log(res);
      var result = res.filter(r => r.employeeID === this.companydetails.employeeID)
      if(result.length>0){
        this.CICredits = result[0].ciCredits;
      }
      
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
