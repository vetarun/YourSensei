import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TrainingEventService } from '../../../Shared/Services/training-event.service';

// import { TrainingEventService } from 'src/app/Shared/Services/training-event.service';

@Component({
  selector: 'app-training-event-list',
  templateUrl: './training-event-list.component.html',
  styleUrls: ['./training-event-list.component.scss']
})
export class TrainingEventListComponent implements OnInit {
  displayedColumns: string[] = ['bannerimageurl', 'eventsname', 'eventFormat', 'instructor', 'startDate', 'status','action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  userRole: any
  searchKey: any;
  companydetails: any;
  CompanyId: any;
  userDetailID: any;
  usertypeid: any;
  companyuser: boolean = false;
  companyadmin: boolean = false;
  individual: boolean = false;
  superadmin: boolean = false;
  constructor(private TrainEventService: TrainingEventService, private _router: Router) { }

  ngOnInit() {
    
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))

    this.CompanyId = this.companydetails.companyId
    this.userDetailID = this.companydetails.userId
    this.usertypeid = this.companydetails.usertypeid;
    

    if (this.usertypeid == '5c37cf64-f617-4399-bb68-645b0c3969a2') {
      this.companyuser = true;
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
    this.getEvents();
  }
  getEvents() {
    
    this.TrainEventService.GetEvent(this.CompanyId,this.userDetailID,this.individual).subscribe(res => {
      console.log(res)

      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  EditEvent(id) {
    this._router.navigate(['/Main/create-event'], { queryParams: { id: id } });
  }
  createevent() {
    this._router.navigateByUrl('/Main/create-event')
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  Clearsearch() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  DeleteEvent(id) {
    if (confirm('Are you sure to delete this event?')) {
      this.TrainEventService.DeleteEvent(id).subscribe(res => {
        if (res.code == 200) {
          this.ngOnInit();
        }


      })
    }

  }
}
