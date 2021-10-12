import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { AuthenticationService } from '../../../../Shared/Services/authentication.service';
import { SubscriptionService } from '../../../../Shared/Services/subscription.service';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {
  searchKey: any;
  companydetails:any=[]
  userId:any
  CompanyID:any
  displayedColumns: string[] =
  [
    'nameOnCard', 
    'cardNumber', 
    'validThru', 
    'cardType', 
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  
  constructor(private _router: Router, private materialModule: MaterialModule,
  private authenticationService:AuthenticationService,private tostr:ToastrService) { }

  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userId=this.companydetails.userId
    this.CompanyID=this.companydetails.companyId
    this.getCardList();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getCardList(){
    
    var compid = this.CompanyID == "00000000-0000-0000-0000-000000000000" ? "" : this.CompanyID;
    this.authenticationService.GetPaymentCardList(0,compid,this.userId).subscribe(res => {
      
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  AddNewCard(){
    this._router.navigate(['/Main/add-card']);
  }

  editCard(id){
    this._router.navigate(['/Main/edit-card', id]);
  }
  deleteCard(data){
    if(confirm('Are u sure to remove this card?')){
      data.isActive=false
      data.UserDetailID=this.userId
      
      var compid = this.CompanyID == "00000000-0000-0000-0000-000000000000" ? "" : this.CompanyID;
      data.CompanyID=compid

    this.authenticationService.AddUpdateCardDetails(data).subscribe
    (res=>this.IsDeleted(res)
    ,err=>{
      this.tostr.error(err.message)
    })
    }
  }

  IsDeleted(res){
    if(res.code==200){
      this.tostr.success('Card removed successfully');
      this.getCardList()
    }
  }
}

