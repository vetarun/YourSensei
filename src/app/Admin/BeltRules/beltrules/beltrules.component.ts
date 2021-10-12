import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { DashboardService } from '../../../Shared/Services/dashboard.service';
import { SubscriptionService } from '../../../Shared/Services/subscription.service';

@Component({
  selector: 'app-beltrules',
  templateUrl: './beltrules.component.html',
  styleUrls: ['./beltrules.component.scss']
})
export class BeltrulesComponent implements OnInit {
  searchKey: any;
  displayedColumns: string[] =
    [
      'beltName',
      'totalA3',
      'totalCredit',
      'totalKaizen',
      'order',
    ];
    
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  CompanyID: string;
  companydetails: any;
  userId: any;
  superAdminUserType = "4BA19173-94CD-4222-AF7C-60C91D446F8E"
  usertypeid: any
  totalBelts
  constructor(private _router: Router, private materialModule: MaterialModule,
    private dashboardService: DashboardService, private tostr: ToastrService) { }
   
  ngOnInit() {

    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userId = this.companydetails.userId
    this.usertypeid = this.companydetails.usertypeid.toUpperCase();
    this.CompanyID = this.companydetails.companyId
    if(this.usertypeid==this.superAdminUserType){
      this.displayedColumns =
    [
      'beltName',
      'totalA3',
      'totalCredit',
      'totalKaizen',
      'order',
      'action'
    ];
    }
    this.getBeltRules();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getBeltRules() {

    this.dashboardService.GetBeltRules(0, this.CompanyID, this.userId).subscribe(res => {
      
      this.totalBelts=res.length

      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  editBelt(id) {
    if (this.usertypeid.toUpperCase() == this.superAdminUserType) {
      this._router.navigate(['/Admin/edit-belt', id]);
    } else {
      this._router.navigate(['/Main/edit-belt', id]);
    }

  }

  addBelt() {
    this._router.navigate(['/Admin/add-belt']);
  }

  deleteBelt(id) {
    if (confirm('Are u sure to delete this belt?')) {
      this.dashboardService.deleteBeltRules(id,this.userId).subscribe(
        res => this.IsBeltRulesDeleted(res), err => {
          this.tostr.error(err.message);
        })
    }
  }

  IsBeltRulesDeleted(res) {
    if (res.code == 200) {
      this.tostr.success(res.message);
      this.getBeltRules()
    } else {
      this.tostr.error(res.message);
    }
  }
}
