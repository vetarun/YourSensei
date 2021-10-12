import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubscriptionService } from '../../../Shared/Services/subscription.service';

@Component({
  selector: 'app-subscriptionplan',
  templateUrl: './subscriptionplan.component.html',
  styleUrls: ['./subscriptionplan.component.scss']
})
export class SubscriptionplanComponent implements OnInit {
  companydetails: any;
  usertypeid: any;
  planModel:any={}
  userId:any
  searchKey: any;
  constructor(private SpinnerService: NgxSpinnerService,
    private toastr: ToastrService, private _router: Router, private materialModule: MaterialModule, private subscriptionService: SubscriptionService) { }
  displayedColumns: string[] =
   [
    'name', 
    'numberOfDays', 
    'numberOfEmployees', 
    'numberOfExternalMentors', 
    'price',
    'action'
];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  
  

  ngOnInit() {

    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.usertypeid = this.companydetails.usertypeid;
    this.userId=this.companydetails.userId
    this.getSubscriptionPlans();
    }
    

    getSubscriptionPlans(){
      this.subscriptionService.GetSubscriptionPlans(0).subscribe(res => {
        
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    }

    AddNewPlan(){
      this._router.navigate(['/Admin/add-subscription-plan']);
    }

    editPlan(id){
      this._router.navigate(['/Admin/edit-subscription-plan', id]);
    }

    deletePlan(planModel){
      if(confirm('Are you sure to delete this plan?')){
        planModel.IsActive=false
        planModel.CreatedBy=this.userId
        planModel.ModifiedBy=this.userId
        this.subscriptionService.AddUpdateSubscriptionPlans(planModel).subscribe
        (res=>this.IsDeletedData(res),
        err=>{
          this.toastr.error(err.message)
        })
      }
    }

    IsDeletedData(res){
      if(res.code==200){
        if(res.code==200){
          this.toastr.success("Data has been deleted successfully!")
          this.getSubscriptionPlans()
        }else{
          this.toastr.error(res.message)
        }
      }
    }
  
    applyFilter() {
      this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }
  }
 