import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { TrainingEventService } from '../../../../Shared/Services/training-event.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-studenttrainingevent',
  templateUrl: './studenttrainingevent.component.html',
  styleUrls: ['./studenttrainingevent.component.scss']
})
export class StudenttrainingeventComponent implements OnInit {

  companyDetails : any = [];
  ActiveSelectionTab: boolean = false;
  trainingEventID: any;
  trainingEvent: any = {};
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  displayedColumns: string[] = ['studentName', 'time', 'test', 'ciCredits'];
  A3model: any = {};
  Kaizenmodel: any = {};
  isA3Event: boolean;
  isKaizenEvent: boolean;
  loggedInUserDetails: any;
  mentoremail: any;
  mentorname: string;
  eventId
  isApprovedByMentor: boolean = false;
  modalData: any = {}
  isInternalMentor: boolean = false
  isDollarApprover: boolean = false
  trainingEventAttendeeInput: any = []
  usertypeid: string;
  mentor: boolean=false;
  isApprovedByDollarApproval: boolean = false;
  userid: any;
  message: any;
  A3CommModel: any = [];
  hideCommTab: boolean = false;
  eventFormat: string;
  constructor(private TrainEventService: TrainingEventService,private SpinnerService: NgxSpinnerService,private _router: Router, private trainingEventService: TrainingEventService, private activatedRoute: ActivatedRoute,
    private materialModule: MaterialModule, private toaster: ToastrService,
    private modalService: NgbModal, private spinnerService: NgxSpinnerService) { }

    savea3form(form: NgForm) {

      console.log('a3 form data', form);
      if (!form.invalid) {
        this.A3model.userid = this.userid
        this.A3model.mentorEmail = this.mentoremail
        this.A3model.mentorName = this.mentorname
        this.A3model.trainingEventID = this.trainingEventID
        this.SpinnerService.show()
        this.TrainEventService.SaveA3FormFields(this.A3model).subscribe(res => {
          if (res.code == 200) {
            this.SpinnerService.hide()
            this.toaster.success(res.message);
            this.getA3formdata()
            this.ActiveSelectionTab = true
          }
          else if (res.code == 404) {
            this.SpinnerService.hide()
            this.toaster.error(res.message);
          }
        })
      }
    }

    savekaizenform(form: NgForm) {
      console.log('kaizen form data', form);
      if (!form.invalid) {
        this.Kaizenmodel.userid = this.userid
        this.Kaizenmodel.mentorEmail = this.mentoremail
        this.Kaizenmodel.mentorName = this.mentorname
        this.Kaizenmodel.trainingEventID = this.trainingEventID
        this.SpinnerService.show()
        this.TrainEventService.SaveKaizenFormFields(this.Kaizenmodel).subscribe(res => {
          if (res.code == 200) {
            this.SpinnerService.hide()
            this.toaster.success(res.message);
            this.getKaizenformdata()
            this.ActiveSelectionTab = true
  
          }
          else if (res.code == 404) {
            this.SpinnerService.hide()
            this.toaster.error(res.message);
          }
        })
      }
    }

  ngOnInit() {

    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"));
    this.mentorname = this.loggedInUserDetails.name;
    this.mentoremail = this.loggedInUserDetails.email;
    if (this.loggedInUserDetails == undefined || this.loggedInUserDetails == null) {
      this._router.navigate(['/Main/login'], { queryParams: { 'redirectURL': this._router.url } });
    }
    else {
      this.trainingEventID = this.activatedRoute.snapshot.queryParams['id'];
      this.getEventByID();
      this.getSelectedEmployeeToAttendTrainingEvent();
      this.getCommdata();
      this.userid = this.loggedInUserDetails.userId
      this.usertypeid = this.loggedInUserDetails.usertypeid
      if (this.usertypeid == "c6156716-6d16-4e75-9660-056a59b7b546" || this.usertypeid == "2d2e4aec-d852-417a-8a54-fe80504d83eb") {
        this.mentor = true;
      }
      this.isInternalMentor = this.loggedInUserDetails.isInternalMentor
      this.isDollarApprover = this.loggedInUserDetails.isDollarApprover
    }

  }

  getEventByID() {
    debugger;
    this.trainingEventService.GetEventById(this.trainingEventID).subscribe(res => {
      this.trainingEvent = res;
      if (this.trainingEvent.trainingformat == "6f9f04cc-198e-479c-a93f-6c3c0a359194") {
        this.isA3Event = true
        this.eventFormat = "A3";
        this.getA3formdata();
        if (this.isA3Event && (this.mentor || this.isInternalMentor) && (this.trainingEvent.status != "Pending Approval" && this.trainingEvent.status != "Approved")) {
          this.displayedColumns = ['studentName', 'time', 'test', 'ciCredits', 'action'];
        } else if (this.isA3Event && this.isDollarApprover) {
          this.displayedColumns = ['studentName', 'time', 'test', 'ciCredits'];
        }
      }
      else if (this.trainingEvent.trainingformat == "5518993a-efc0-4ad0-bcd7-beaea42cc2ce") {
        this.isKaizenEvent = true
        this.eventFormat = "Kaizen";
        this.getKaizenformdata();
        if (this.isKaizenEvent && (this.mentor || this.isInternalMentor) && (this.trainingEvent.status != "Pending Approval" && this.trainingEvent.status != "Approved")) {
          this.displayedColumns = ['studentName', 'time', 'test', 'ciCredits', 'action'];
        } else if (this.isKaizenEvent && this.isDollarApprover) {
          this.displayedColumns = ['studentName', 'time', 'test', 'ciCredits'];
        }
      }

      if (!this.isA3Event && !this.isKaizenEvent) {
        this.hideCommTab = true;
      }
      else{
        this.hideCommTab = false;
      }
    });
  }
  getA3formdata() {
    this.trainingEventService.GetA3FormDataById(this.trainingEventID).subscribe(res => {

      if (res != null) {
        this.A3model = res;
      }

    })
  }
  getKaizenformdata() {

    this.trainingEventService.GetKaizenFormDataById(this.trainingEventID).subscribe(res => {

      if (res != null) {
        this.Kaizenmodel = res;
      }

    })
  }
  getCommdata() {

    this.trainingEventService.GetA3TrainingEventsCommData(this.trainingEventID).subscribe(res => {

      this.A3CommModel = []
      if (res != null) {
        this.A3CommModel = res;
      }

    })
  }
  getSelectedEmployeeToAttendTrainingEvent() {
    this.trainingEventService.GetSelectedEmployeeToAttendTrainingEvent(this.trainingEventID, true).subscribe(res => {
      res.forEach(element => {
        element.ciCredits = (element.time * element.test) / 100;
      });

      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ApproveEventByMentor() {
    this.spinnerService.show()
    this.trainingEventService.ApproveEventbyMentorFromEventId(this.trainingEventID).subscribe(res => {
      debugger;
      if (res.code == 200) {
        this.spinnerService.hide()
        this.isApprovedByMentor = true;
        this.toaster.success(res.message);
        location.reload();
      }
      else {
        this.spinnerService.hide()
        this.toaster.error(res.message)
      }
    }, err => {
      this.spinnerService.hide()
    })
  }
  ApproveEventByDollarApproval() {
    this.spinnerService.show()
    this.trainingEventService.ApproveEventbyDollarApproverFromEventId(this.trainingEventID).subscribe(res => {
      debugger;
      if (res.code == 200) {
        this.spinnerService.hide()
        this.isApprovedByDollarApproval = true;
        this.toaster.success(res.message);
        location.reload();
      }
      else {
        this.spinnerService.hide()
        this.toaster.error(res.message)
      }
    }, err => {
      this.spinnerService.hide()
    })
  }
  removeTags(str) {
    if ((str === undefined) || (str === null) || (str === '')) {
      return "";
    }
    else {
      str = str.toString();
      return str.replace(/(<([^>]+)>)/ig, '');
    }
  }

  editTestAndCredit(content, StudentName, Time, Test, CICredits, trainingEventAttendeeID, empId) {
    this.modalData.StudentName = StudentName
    this.modalData.Time = Time
    this.modalData.Test = Test
    this.modalData.CICredits = CICredits
    this.modalData.empId = empId
    this.modalData.trainingEventAttendeeID = trainingEventAttendeeID
    this.trainingEventAttendeeInput = []

    this.modalService.open(content, { backdrop: "static", size: "lg", ariaLabelledBy: 'modal-basic-title' });
  }
  updateTestAndTime() {
    this.trainingEventAttendeeInput.push(
      {
        'TrainigEventID': this.trainingEventID, 'trainingEventAttendeeID': this.modalData.trainingEventAttendeeID,
        'EmployeeID': this.modalData.empId, 'Time': Number(this.modalData.Time), 'Test': Number(this.modalData.Test)
      })
    this.trainingEventService.UpdateAttendeelogsbyAtendeeid(this.trainingEventAttendeeInput).subscribe(res => {
      if (res.code == 200) {
        this.toaster.success(res.message)
        location.reload()
      }
      else {
        this.toaster.error(res.message)
      }
    })
  }

  // Approve() {

  //   debugger;
  //   if ((this.mentor || this.isInternalMentor) && !this.isDollarApprover) {
  //     this.ApproveEventByMentor();
  //   }
  //   else if (this.isDollarApprover && (!this.mentor && !this.isInternalMentor)) {
  //     this.ApproveEventByDollarApproval();
  //   }
  //   else if (this.isDollarApprover && this.isInternalMentor) {
  //     this.ApproveEventByMentor();
  //     if (this.isApprovedByMentor) {
  //       this.ApproveEventByDollarApproval()
  //     }
  //   }
  // }
  //   getTimeDifference(sendtime){
  // alert(sendtime)
  //   }
  savechat() {


    if (this.message != undefined && this.message != null && this.message != "") {

      this.spinnerService.show()
      this.trainingEventService.SaveA3TrainingEventsCommData(this.trainingEventID, this.userid, this.message).subscribe(res => {
        if (res.code == 200) {
          this.spinnerService.hide()
          this.toaster.success(res.message);
          this.getCommdata();
        }
        else {
          this.spinnerService.hide()
          this.toaster.error(res.message)
        }
      }, err => {
        this.spinnerService.hide()
      })
    }
  }

  getInitialCharacter(sender) {
    return sender.substring(0, 1);
  }
}
