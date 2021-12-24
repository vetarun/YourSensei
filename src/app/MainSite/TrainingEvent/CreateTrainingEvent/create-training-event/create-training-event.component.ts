import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { MentorService } from '../../../../Shared/Services/mentor.service';
import { TrainingEventService } from '../../../../Shared/Services/training-event.service';


@Component({
  selector: 'app-create-training-event',
  templateUrl: './create-training-event.component.html',
  styleUrls: ['./create-training-event.component.scss']
})
export class CreateTrainingEventComponent implements OnInit {
  BookModel: any = {}
  employeelisttosend: any = []
  btnclick: boolean = false
  path: string
  eventFormat: any
  DurationHrs: Number
  DurationMins: Number
  IsStartEndDateValid: boolean = false
  eventId
  Heading = 'Add'
  buttontext = 'Submit'
  companydetails: any;
  empList: any = [];
  employeelist: any = [];
  employeelistforcreditlog: any = [];
  htmlContent: any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '190px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  buttonwidth: string = "col-sm-6 text-right";
  mentorID: any = null;
  todayDate: string;
  ActiveSelectionTab: boolean = false;
  closeEvenetTabActive: boolean = false;
  usertypeid: any;
  companyuser: boolean = false;
  companyadmin: boolean = false;
  individual: boolean = false;
  superadmin: boolean = false;
  mentorObj: any = {};
  resObj: any ={};
  eventFormatName: any;
  isA3FFormat: boolean;
  A3model: any = {}
  Kaizenmodel: any = {}
  a3btnclick: boolean = false;
  userid: any;
  showa3tab: boolean = false;
  ActiveSA3Tab: boolean;
  ActiveSKaizen: boolean;
  isSelectedAttenddeSelect: boolean = false;
  logButtonText: string = "Sumbit & Close Event";
  empListForA3: any = [];
  mentoremail: any;
  A3CommModel: any = [];
  KaizenCommModel: any= [];
  message: string;
  responsibletrainerName: any;
  showKiazenTab: boolean = false;
  mentorname: string;
  commtabname: string;
  selectedeventcreatorid: any;
  selectedeventcreatorname: any;
  ActiveKaizenTab: boolean;
  constructor(private SpinnerService: NgxSpinnerService, private empservice: EmployeeService, public activatedRoute: ActivatedRoute,
    private TrainEventService: TrainingEventService, private toaster: ToastrService, private router: ActivatedRoute, private _router: Router,
    private mentorService: MentorService) {

  }

  ngOnInit() {
    this.btnclick = false;
    this.a3btnclick = false;
    this.A3model = {}
    this.Kaizenmodel = {}
    this.todayDate = new Date().toJSON().slice(0, 10);
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.usertypeid = this.companydetails.usertypeid;
    this.userid = this.companydetails.userId
    this.responsibletrainerName = this.companydetails.name;
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

    this.router.queryParams.subscribe((params: Params) => {
      if (!this.isSelectedAttenddeSelect) {
        this.eventId = this.activatedRoute.snapshot.queryParams['id'];
      }

      if (this.activatedRoute.snapshot.queryParams['eventformat'] != undefined) {
        this.BookModel.trainingformat = this.activatedRoute.snapshot.queryParams['eventformat'];
        this.BookModel.location = "Online"
        this.BookModel.duration = "2"
      }
    })

    this.GetEventFormat()

    if (this.eventId != undefined && this.eventId != null) {
      // edit event
      this.GetEventById(this.eventId)
      this.getemployeelistforcreditlog();
    }
    else {
      // new event
      if (this.individual == false) {
        debugger;
        if (this.BookModel.trainingformat == "6f9f04cc-198e-479c-a93f-6c3c0a359194") {
          this.GetMentor("Company");
          debugger;
          this.GetEmployeeForA3()
        }
        else {
          this.GetEmployee()
        }

      }
      else {
        this.GetMentor("individual");
      }

    }


  }
  formatChange() {

    debugger;
    if (this.BookModel.trainingformat == "6f9f04cc-198e-479c-a93f-6c3c0a359194") {
      this.empList = []
      this.BookModel.location = "Online"
      this.BookModel.duration = "2"
      if(this.individual == true){
        this.GetMentor("individual");
      }
      else {
        this.GetMentor("Company");
      }
    }
    else {
      this.ngOnInit();
    }
  }

  getA3formdata() {
    this.TrainEventService.GetA3FormDataById(this.eventId).subscribe(res => {
      if (res != null) {

        this.A3model = res;
      }
      else {
        this.A3model.assignedTo = this.companydetails.employeeID;
      }
    })
  }

  GetMentor(user) {
    debugger;
    let empobj: any = {};
    console.log('book model',this.BookModel);
    empobj.id = this.BookModel.id;
    this.selectedeventcreatorid = this.BookModel.instructor;
    this.selectedeventcreatorname = this.BookModel.instructorName;
    if(this.selectedeventcreatorname != null){
    this.selectedeventcreatorname = this.BookModel.instructorName.split(" ");
    empobj.firstName = this.selectedeventcreatorname[0]
    empobj.lastName = this.selectedeventcreatorname[1]
    }
    var foundinEmpList = this.empList.some(a => a.id === empobj.id);
    if (!foundinEmpList) {
      if(empobj.id != undefined){
        this.BookModel.instructor = empobj.id;
        this.empList.push(empobj);
      }
      if (this.eventId == undefined && this.eventId == null) {
        this.BookModel.instructor = this.selectedeventcreatorid;
      }
    }

    var foundinEmployeeList = this.employeelist.some(a => a.empId === this.selectedeventcreatorid);
    if (!foundinEmployeeList) {
      this.employeelist.push({
        'index': 0, 'IsSelected': true, 'empId': this.selectedeventcreatorid,
        'employeeName': this.BookModel.instructorName, 'Time': 0, 'Test': 0
      })
    }

    if (user == "individual") {
      this.mentorService.GetMentorByEmployeeID(this.selectedeventcreatorid).subscribe(res => {
        debugger;
        this.mentorObj = res;
        if (this.mentorObj != null) {
          var found = this.empList.some(a => a.id === this.mentorObj.id);
          if (found == false) {
            let empobj1: any = {};
            empobj1.id = this.mentorObj.id;
            empobj1.firstName = this.mentorObj.firstName;
            empobj1.lastName = this.mentorObj.lastName;
            empobj1.email = this.mentorObj.email;
            this.empList.push(empobj1);
            

            if (this.eventId != undefined && !this.showa3tab && !this.showKiazenTab) {
              this.isMentorSelected(empobj1.id, empobj1.firstName, empobj1.lastName, empobj1.eamil);
            }
            else {

              var foundmentor = this.employeelist.some(a => a.empId === empobj1.id);
              if (foundmentor == false) {
                this.mentorID = empobj1.id
                this.mentoremail = empobj1.email
                this.mentorname = empobj1.firstName + " " + empobj1.lastName
                this.employeelist.push({

                  'index': 1, 'IsSelected': true, 'empId': empobj1.id,
                  'employeeName': empobj1.firstName + " " + empobj1.lastName, 'Time': 0, 'Test': 0
                })
              }
            }
          }
        }

      });
    }
    if (user == "Company") {

      this.mentorService.GetMentorsByIsActive(this.companydetails.companyId, true).subscribe(res => {
        debugger;
        this.mentorObj = res;
        if (this.mentorObj != null) {
          if(this.BookModel.trainingformat == "6f9f04cc-198e-479c-a93f-6c3c0a359194"){
            debugger;
            if (this.eventId == undefined && this.eventId == null) {
            let empobj: any = {};
            var name = this.companydetails.name;
            empobj.firstName = name.split(' ')[0]
            empobj.lastName = name.split(' ')[1];
            empobj.id = this.companydetails.employeeID;
            var found = this.empList.some(a => a.empId === empobj.id);
            if (found== false){
            this.empList.push(empobj);
            }
            this.selectedeventcreatorid = empobj.id;
            }

            this.mentorService.GetMentorByEmployeeID(this.selectedeventcreatorid).subscribe(res => {
              debugger;  
              this.resObj = res;           
              let empobj1: any = {};
              empobj1.id = this.resObj.id;
              empobj1.firstName = this.resObj.firstName;
              empobj1.lastName = this.resObj.lastName;
              var found = this.empList.some(a => a.empId === empobj1.id);
              if(found == false){
              this.empList.push(empobj1);
              }
            })
          }
          else {
          this.mentorObj.forEach(element => {
            var found = this.empList.some(a => a.id === element.id);
            if (!found) {
              let empobj1: any = {};
              empobj1.id = element.id;
              var fullname = element.employeeName;
              empobj1.firstName = fullname.split(' ')[0]
              empobj1.lastName = fullname.split(' ')[1];
              empobj1.email = element.email
              var found = this.empList.some(a => a.empId === empobj1.id);
              if(found == false){
              this.empList.push(empobj1);
              }
        
              if (this.eventId != undefined && this.eventId != null) {
                this.isMentorSelected(element.id, empobj1.firstName, empobj1.lastName, empobj1.email);
              }
              debugger;
            }
          });


        }
      }
      });
    }



  }
  isMentorSelected(id, firstname, lastname, email) {

    this.TrainEventService.IsInvitedToTrainingEvent(this.eventId, id).subscribe(res => {
      debugger;
      var foundmentor = this.employeelist.some(a => a.empId === id);
      if (foundmentor == false) {
        if(this.companydetails.mentorID == id){
          this.mentorID = id;
          this.mentoremail = email
          this.mentorname = firstname + " " + lastname
        }
       
        this.employeelist.push({
          'index': 1, 'IsSelected': res, 'empId': id,
          'employeeName': firstname + " " + lastname, 'Time': 0, 'Test': 0
        })
      }

    });
  }

  getemployeelistforcreditlog() {
    this.TrainEventService.GetSelectedEmployeeToAttendTrainingEvent(this.eventId, true).subscribe(res => {

      this.employeelistforcreditlog = []
      for (var i = 0; i < res.length; i++) {
        this.employeelistforcreditlog.push({
          'index': i, 'Time': res[i].time, 'Test': res[i].test, 'empId': res[i].empId,
          'employeeName': res[i].employeeName, 'trainingEventAttendeeID': res[i].trainingEventAttendeeID, 'eventTrainingName': res[i].eventTrainingName,
          'scheduleDate': res[i].scheduleDate, 'CICredits': 0
        })
        this.CalculateCICredits(i, null, '')
      }
    })
  }
  getemployeelist() {
    this.TrainEventService.GetSelectEmployeeToAttendTrainingEvent(this.eventId, this.companydetails.companyId).subscribe(res => {

      debugger
      this.employeelist = []
      for (var i = 0; i < res.length; i++) {
        if (res[i].empId == this.companydetails.employeeID) {
          res[i].isselected = true
        }
        this.employeelist.push({
          'index': i, 'IsSelected': res[i].isselected, 'empId': res[i].empId,
          'employeeName': res[i].employeeName, 'Time': res[i].time, 'Test': res[i].test
        })
      }

      console.log('Employee list', this.employeelist);

    })
  }
  CalculateCICredits(i, e, fieldname) {
    if (fieldname == 'Time') {
      if (Number(this.BookModel.duration) >= Number(e)) {
        this.employeelistforcreditlog[i].Time = e
      }
      else {
        (<HTMLInputElement>document.getElementById("logtime-" + i)).value = this.employeelistforcreditlog[i].Time;
        this.toaster.error("You cannot exceed from " + this.BookModel.duration + " Hours")
      }

    } else if (fieldname == 'Test') {
      this.employeelistforcreditlog[i].Test = e
    }
    this.employeelistforcreditlog[i].CICredits = (Number(this.employeelistforcreditlog[i].Test) * Number(this.employeelistforcreditlog[i].Time)) / 100

  }
  GetEmployee() {
    this.empservice.GetAllEmployee(this.companydetails.companyId).subscribe(res => {
      debugger;
      this.empList = []
      this.empList = res;
      if (this.eventId == undefined && this.eventId == null) {
        this.BookModel.instructor = this.companydetails.employeeID
      }

      this.GetMentor("Company");
    })

  }
  GetEmployeeForA3() {
    debugger;
    this.empservice.GetAllEmployee(this.companydetails.companyId).subscribe(res => {

      this.empListForA3 = []
      this.empListForA3 = res;
      if (this.eventId == undefined && this.eventId == null) {

        this.A3model.assignedTo = this.companydetails.employeeID
      }

      debugger;
    })

  }
  CloseeventApiCalling() {
    this.TrainEventService.CloseEvent(this.BookModel.closingNote.replaceAll('&#160;',' '), this.eventId).subscribe(res => {
      if (res.code == 200) {
        this.SpinnerService.hide();
        this.toaster.success("event has been successfully closed")
        this._router.navigateByUrl('/Main/event-list')
      }
      else {
        this.SpinnerService.hide();
        this.toaster.error(res.message)
      }
    },
      err => {
        this.SpinnerService.hide();
        this.toaster.error(err)
      }
    )
  }
  CloseEvent(form: NgForm) {
    this.btnclick = true
    if (!form.invalid) {
      this.SubmitList('credit');


    }
  }
  CreateEvent(form: NgForm) {
    this.btnclick = true
    if (form.valid) {
      this.BookModel.Owner = this.companydetails.userId
      if (this.eventId == undefined) {
        this.BookModel.responsibletrainer = this.companydetails.userId
      }
      this.BookModel.companyid = this.companydetails.companyId
      this.BookModel.userDetailedID = this.companydetails.userId
      this.BookModel.isIndividual = this.individual
      this.TrainEventService.CreateEvent(this.BookModel).subscribe(res => {
        if (res.code == 200) {
          if (res.eventid != undefined && res.eventid != "00000000-0000-0000-0000-000000000000") {
            this.isSelectedAttenddeSelect = true
            this.toaster.success(res.message)
            this.eventId = res.eventid
            this.ngOnInit();


          } else {

            this.toaster.success(res.message)
            this._router.navigateByUrl('/Main/event-list')
          }
        }
        else {
          this.toaster.success(res.message)
        }
      }, err => {
        this.toaster.error("Something went wrong please try again after a moment!")
      })


    }

  }


  GetEventFormat() {
    this.TrainEventService.GetEventFormat().subscribe(res => {
      this.eventFormat = res;
    })
  }


  getCommdata() {
    this.TrainEventService.GetA3TrainingEventsCommData(this.eventId).subscribe(res => {

      this.A3CommModel = []
      if (res != null) {
        this.A3CommModel = res;
      }

    })
  }
  savechat() {


    if (this.message != undefined && this.message != null && this.message != "") {

      this.SpinnerService.show()
      this.TrainEventService.SaveA3TrainingEventsCommData(this.eventId, this.userid, this.message).subscribe(res => {
        if (res.code == 200) {
          this.SpinnerService.hide()
          this.toaster.success(res.message);
          this.getCommdata();
        }
        else {
          this.SpinnerService.hide()
          this.toaster.error(res.message)
        }
      }, err => {
        this.SpinnerService.hide()
      })
    }
  }
  GetEventById(id) {
    this.TrainEventService.GetEventById(id).subscribe(res => {

      this.BookModel = res

      this.BookModel.trainingformat = res.trainingformat
      this.BookModel.instructor = res.instructor
      this.BookModel.startdate = res.startdate.split('T')[0]
      this.buttontext = 'Update'
      this.Heading = 'Update'
      this.responsibletrainerName = res.responsibleTrainerName
      this.BookModel.id = this.eventId


      // let isSelectedAttenddeSelect = this.activatedRoute.snapshot.queryParams['page'] != undefined
      if (this.BookModel.trainingformat == "6f9f04cc-198e-479c-a93f-6c3c0a359194") {
        this.GetEmployeeForA3()
        this.logButtonText = "Submit"
        this.showa3tab = true;
        this.commtabname = "A3";
        this.getA3formdata();
        this.getCommdata();
        this.GetMentor("individual");
        if (this.isSelectedAttenddeSelect) {
          this.ActiveSA3Tab = true
        }
      }
      else if (this.BookModel.trainingformat == "5518993a-efc0-4ad0-bcd7-beaea42cc2ce") {
        this.getemployeelist();
        this.GetEmployee()
        this.showKiazenTab = true;
        this.commtabname = "Kaizen";
        this.getKaizenformdata();
        this.getCommdata();
        if (this.isSelectedAttenddeSelect) {
          this.ActiveKaizenTab = true
        }
      }
      else {
        if (this.isSelectedAttenddeSelect) {
          this.ActiveSelectionTab = true;
          this.getemployeelist();
          this.GetEmployee()
        }
        else if (this.individual == false ) {
          this.getemployeelist();
          this.GetEmployee()          
        }
        else {
          this.GetMentor("individual");
        }
      }
      
    })
  }

  checkall(e) {

    for (var i = 0; i < this.employeelist.length; i++) {
      this.employeelist[i].IsSelected = e
    }
  }

  checkemployee(e, index) {

    this.employeelist[index].IsSelected = e
    console.log('employee list',this.employeelist)
  }

  SubmitList(tab) {
    this.SpinnerService.show();
    this.employeelisttosend = []
    if (tab != 'credit') {

      for (var i = 0; i < this.employeelist.length; i++) {
        if (this.employeelist[i].IsSelected)
          this.employeelisttosend.push({
            'EmployeeID': this.employeelist[i].empId
            , 'TrainigEventID': this.eventId, 'Time': Number(this.employeelist[i].Time), 'Test': Number(this.employeelist[i].Test),

          })
      }
      console.log('employee list',this.employeelist);
      this.saveattendeelist();
    }
    else {
      if (this.employeelistforcreditlog.length) {
        for (var i = 0; i < this.employeelistforcreditlog.length; i++) {
          this.employeelisttosend.push({
            'EmployeeID': this.employeelistforcreditlog[i].empId
            , 'TrainigEventID': this.eventId, 'trainingEventAttendeeID': this.employeelistforcreditlog[i].trainingEventAttendeeID, 'Time': Number(this.employeelistforcreditlog[i].Time), 'Test': Number(this.employeelistforcreditlog[i].Test),

          })
        }
        this.saveattendeelogs()
      }
      else {
        this.toaster.error("Please submit Attendee list first")
      }
    }


  }
  savea3form(form: NgForm) {

    this.a3btnclick = true
    if (!form.invalid) {
      this.A3model.userid = this.userid
      this.A3model.mentorEmail = this.mentoremail
      this.A3model.mentorName = this.mentorname
      this.A3model.trainingEventID = this.eventId
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
  saveattendeelist() {
    this.TrainEventService.CreateEmployeeToEventAttendee(this.employeelisttosend).subscribe(res => {
      this, this.SpinnerService.show()
      if (res.code == 200) {

        this.SpinnerService.hide()
        this.toaster.success('Data has been submitted successfully!')
        this.closeEvenetTabActive = true
        this.ngOnInit()

      } else {
        this.toaster.error('Some thing went wrong please try after a moment!')
      }
    }, err => {
      this.toaster.error('Some thing went wrong please try after a moment!')
    })
  }

  saveattendeelogs() {
    this.TrainEventService.UpdateAttendeelogsbyAtendeeid(this.employeelisttosend).subscribe(res => {
      this, this.SpinnerService.show()
      if (res.code == 200) {
        if (!this.btnclick) {
          this.SpinnerService.hide()
          this.toaster.success('Data has been submitted successfully!')
          this.closeEvenetTabActive = true
          this.ngOnInit()

        }
        else {
          this.CloseeventApiCalling()

        }

      } else {
        this.SpinnerService.hide()
        this.toaster.error('Some thing went wrong please try after a moment!')
      }
    }, err => {
      this.SpinnerService.hide()
      this.toaster.error('Some thing went wrong please try after a moment!')
    })
  }

  getInitialCharacter(sender) {
    return sender.substring(0, 1);
  }

  //Kaizen Event by Saurabh-------
  getKaizenformdata() {
      this.TrainEventService.GetKaizenFormDataById(this.eventId).subscribe(res => {
      if (res != null) {

        this.Kaizenmodel = res;
      }
      else {
        this.Kaizenmodel.assignedTo = this.companydetails.employeeID;
      }
      console.log(this.Kaizenmodel);
    })
  }

  savekaizenform(form: NgForm) {
    this.a3btnclick = true
    if (!form.invalid) {
      this.Kaizenmodel.userid = this.userid
      this.Kaizenmodel.mentorEmail = this.mentoremail
      this.Kaizenmodel.mentorName = this.mentorname
      this.Kaizenmodel.trainingEventID = this.eventId
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
}
