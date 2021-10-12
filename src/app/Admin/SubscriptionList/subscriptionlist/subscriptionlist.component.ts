import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { SubscriptionService } from '../../../Shared/Services/subscription.service';

@Component({
  selector: 'app-subscriptionlist',
  templateUrl: './subscriptionlist.component.html',
  styleUrls: ['./subscriptionlist.component.scss']
})
export class SubscriptionlistComponent implements OnInit {
  searchKey: any;
  displayedColumns: string[] =
  [
    'subscriptionOwner', 
    'planName', 
    'purchasedDate', 
    'purchasedBy', 
    'renewalDate',
    'activationDate',
    'expiryDate',
    'isExpired'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  
  constructor(private _router: Router, private materialModule: MaterialModule, private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.getSubscriptions();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getSubscriptions(){
    this.subscriptionService.GetSubscriptions().subscribe(res => {
      
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

}
