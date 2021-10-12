import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { TrainingEventService } from '../../../../Shared/Services/training-event.service';


@Component({
  selector: 'app-a3-training-event-list',
  templateUrl: './a3-training-event-list.component.html',
  styleUrls: ['./a3-training-event-list.component.scss']
})
export class A3TrainingEventListComponent implements OnInit {

  loggedInUserDetails: any;
  userID: any;
  userTypeID: any;
  mentor: boolean = false;
  employeeList: any;
  kaizenList: boolean = false;
  companyID: any;
  employeeId: any;
  searchKey: any;
  trainingEventList: any = [];
  dataSource: MatTableDataSource<any>; 
  isInternalMentor:boolean
  companydetails:any
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  displayedColumns: string[] = ['bannerimageurl', 'eventName', 'startDate', 'instructorName', 'status', 'action'];
  BookModel: any;
  TrainEventService: any;
  trainingformat: any;
  //activatedRoute: any;
  
  constructor(private employeeService: EmployeeService, private _router: Router, private trainingEventService: TrainingEventService,private router: ActivatedRoute,
    private materialModule: MaterialModule, public activatedRoute: ActivatedRoute) {
      this.companydetails=localStorage.getItem('companyDetails')
      this.companydetails=JSON.parse(this.companydetails)
      this.isInternalMentor = this.companydetails.isInternalMentor;
     }

  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userID = this.loggedInUserDetails.userId;
    this.userTypeID = this.loggedInUserDetails.usertypeid;
    this.companyID = this.loggedInUserDetails.companyId;
    this.employeeId = "00000000-0000-0000-0000-000000000000";
    //this.trainingformat = this.loggedInUserDetails.trainingformat;
    ;
    //this.getEmployeeByMentorID();
   //this.GetA3TrainingEventsByCompanyID();
    //this.GetKaizenTrainingEventsByCompanyID()

   this.router.queryParams.subscribe((params: Params) => {
    if (this.activatedRoute.snapshot.queryParams['eventformat'] != undefined) {
      this.trainingformat = this.activatedRoute.snapshot.queryParams['eventformat'];
    }
  
   if (this.trainingformat == "6f9f04cc-198e-479c-a93f-6c3c0a359194") {
    this.GetA3TrainingEventsByCompanyID();
   }
   else if ( this.trainingformat == "5518993a-efc0-4ad0-bcd7-beaea42cc2ce") {
    this.GetKaizenTrainingEventsByCompanyID();
   }
  })
  }

  // getEmployeeByMentorID(){
  //   this.employeeService.GetEmployeeByMentorID(this.mentorID).subscribe(res => {
  //     this.employeeList = res;
  //   })
  // }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  // searchByEmployeeID(){
  //   this.getTrainingEventAttendeeByMentorIDAndEmployeeID();
  // }


  GetA3TrainingEventsByCompanyID(){
    debugger;
    this.trainingEventService.GetA3TrainingEventsByCompanyID(this.companyID, true).subscribe(res => {
      res.forEach(element => {
        if(this.trainingEventList !== null){
          var found = this.trainingEventList.some(a => a.trainingEventID === element.trainingEventID);
          if(!found){
            this.trainingEventList.push(element);
          }
        }
        else{
          this.trainingEventList.push(element);
        }
      });
      console.log(this.trainingEventList);
      this.dataSource = new MatTableDataSource(this.trainingEventList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  GetKaizenTrainingEventsByCompanyID(){
    debugger
    this.kaizenList = true;
    this.trainingEventService.GetKaizenTrainingEventsByCompanyID(this.companyID, true).subscribe(res => {
      res.forEach(element => {
        if(this.trainingEventList !== null){
          var found = this.trainingEventList.some(a => a.trainingEventID === element.trainingEventID);
          if(!found){
            this.trainingEventList.push(element);
          }
        }
        else{
          this.trainingEventList.push(element);
        }
      });
      console.log(this.trainingEventList);

      this.dataSource = new MatTableDataSource(this.trainingEventList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}

