import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Assessmentanswer } from '../../../Models/InitialAssessment/AssessmentAnswer';
import { InitialAssessmentService } from '../../../Shared/Services/initial-assessment.service';

@Component({
  selector: 'app-initialassessment',
  templateUrl: './initialassessment.component.html',
  styleUrls: ['./initialassessment.component.scss']
})
export class InitialassessmentComponent implements OnInit {
  totalnoOFQues: any;
  lstquestion: any = [];
  active: number=1;
  queanswer: any;
  value: any;
  show: boolean;
  buttonDisabled: boolean = true;
  prevbuttonDisabled: boolean = true;
  anslist: any = [];
  useranswer: any;
  companydetails: any;
  userid: any;
  userRole: any;
  companyid: any;
  firstname: any;
  lastname: any;
  totalmarks: number = 0;
  email: any;
  phone: string;
  submitclick: boolean=false;
  quizDisabled: boolean=true;
  totalScore: number = 0;
  totalquestionmarks: number = 0;
  thankU:boolean=false

  constructor(private initialassessment: InitialAssessmentService, private SpinnerService: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.totalScore = 0;
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    if (this.companydetails != undefined) {
      this.quizDisabled = false
      this.userid = this.companydetails.userId;
      this.email = this.companydetails.email;
      this.userRole = this.companydetails.roles;
      this.companyid = this.companydetails.companyId
      this.phone = this.companydetails.phone
      if (this.companydetails.name != "") {
        
        var fullname = this.companydetails.name.split(" ");
        this.firstname = fullname[0];
        if (fullname[1] != "")
          this.lastname = fullname[1];
        else {
          this.lastname = fullname[2];
        }

        // this.first_name = this.companydetails.name.split(" ")[0];
        // this.last_name = this.companydetails.name.split(" ")[1];
      }
    }

    this.getAssessment();
  }
  getAssessment() {
    

    this.initialassessment.GetInitialAssessment().subscribe(res => {
      
      this.totalnoOFQues = res.length
      if (this.totalnoOFQues > 0) {
        this.lstquestion = res;
        this.active = this.lstquestion[0].questionid;
        this.queanswer = this.lstquestion[0].useranswer;




      }

    })
  }
  previous(questionumber: any, index: any) {

    this.active = this.lstquestion[index].questionid;
    this.queanswer = this.lstquestion[index].useranswer;

    this.value = this.value - ((1 / (this.lstquestion.length - 1)) * 100);
    this.show = false;
    if (this.lstquestion[index + 1].useranswer != null && this.queanswer != null || this.queanswer != null) {
      this.buttonDisabled = false;
      //this.ShowQuestionResult = true
    }
    else {
      this.buttonDisabled = true;
      //this.ShowQuestionResult = false
    }

    if (index == 0) {
      this.prevbuttonDisabled = true;
    }
    if (this.active != null) {
      let queans: any;
      queans = this.anslist.filter(u => u.questionid === this.active);

    }
  }
  next(questionumber: any, index: any) {
    

    this.active = this.lstquestion[index].questionid;
    this.queanswer = this.lstquestion[index].useranswer;
    this.value = this.value + ((1 / (this.lstquestion.length - 1)) * 100);
    if (this.queanswer != null) {
      this.show = true
      this.buttonDisabled = false

    }
    else {
      this.show = false
      this.buttonDisabled = true

    }

    if (index == 0)
      this.prevbuttonDisabled = true;
    else
      this.prevbuttonDisabled = false;
  }
  startQuiz(empForms: NgForm) {
    this.submitclick = true
    if (!empForms.invalid) {
      this.quizDisabled = false
    }
  }
  changeanswer(answers, questionumber, index) {
    
    if (answers != null) {
      this.queanswer = answers;
      this.totalmarks = this.totalmarks + index
      this.show = true;
      this.buttonDisabled = false;
      this.useranswer = answers
      this.totalquestionmarks = this.totalquestionmarks + this.lstquestion[index].questionoptions.length
      //add answer here
      for (var i = 0; i < this.lstquestion.length; i++) {
        if (questionumber == this.lstquestion[i].questionid) {
          this.lstquestion[i].useranswer = this.useranswer
          let checkid: any
          checkid = this.anslist.filter(u => u.questionid === questionumber)
          if (!checkid.length) {
            let queans = new Assessmentanswer();
            queans.questionid = questionumber;
            queans.optionid = this.useranswer;
            queans.userdetailid = this.userid;
            queans.companyid = this.companyid;
            queans.firstname = this.firstname;
            queans.lastname = this.lastname;
            queans.email = this.email
            queans.phone = this.phone;
            queans.score=index
            this.anslist.push(queans);
          }


        }
      }
    }
  }

  submit() {
    
    this.SpinnerService.show();
    this.totalScore = 0;
    this.initialassessment.SaveAssessmentAnswer(this.anslist).subscribe(res => {
      this.SpinnerService.hide();
      if (res.code == 200) {
        
        this.thankU=true
        this.toastr.success(res.message)
       
          this.totalScore = (this.totalmarks/this.totalquestionmarks)*100
      
      }
      else {
        this.toastr.success(res.message)
      }
    })
  }

  resetAssessment(){
    location.reload();
  }
}
