import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../../Shared/Services/book.service';
import { QuizService } from '../../../../Shared/Services/quiz.service';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.scss']
})
export class AddquizComponent implements OnInit {
  userid;
  userRole;
  companyid;
  QuizModel: any = {};
  QuestionModel: any = {};
  optList:any=[];
  btnQuizClick: boolean = false;
  btnQuestionClick: boolean = false;
  buttonname="Create";
  submitclick: boolean = false;
  usertypeid: any;
  showQuestionForm: boolean = false;
  showQuizForm: boolean = false;
  headerText: string = "Create a Quiz!";
  showOptionRowOne: boolean = false;
  showOptionRowTwo: boolean = false;
  bookID: any;
  bookList: any=[];
  loggedInUserDetails: any;
  superadmin: boolean = false;
  enableBookList: boolean = false;
  quizID: any;
  quesID: number=0;
  page: any;
  @Input() bookId: any;
  @Input() from: any;
  individual: boolean=false;
  createbtnwidth:string="col-lg-12 col-md-12 text-center";
  quesIdList: any=[];
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
  
  constructor(private bookService: BookService, private toaster: ToastrService, private activatedRoute: ActivatedRoute, private _router: Router,
    private quizService: QuizService) { }

  ngOnInit() {   
    this.showQuizForm = true;
    this.QuestionModel.QuestionType = "Subjective";

    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    
    this.userid = this.loggedInUserDetails.userId;
    this.usertypeid = this.loggedInUserDetails.usertypeid;
    this.companyid = this.loggedInUserDetails.companyId;
    if (this.usertypeid == '4ba19173-94cd-4222-af7c-60c91d446f8e') {
      this.superadmin = true;
    }
    else if (this.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e') {
      this.individual = true;
    }
    this.getBookByCompanyID();


    this.QuizModel.bookID = this.activatedRoute.snapshot.queryParams['id'];
    this.QuizModel.bookID = this.bookId
    this.quizID = this.activatedRoute.snapshot.queryParams['quizid'];
    this.page = this.activatedRoute.snapshot.queryParams['page'];
    if(this.activatedRoute.snapshot.queryParams['quesID'] != undefined){
      this.quesID = this.activatedRoute.snapshot.queryParams['quesID'];
    }
    
    if(this.quesID != 0){
this.quizService.GetQuestionDetails(this.quesID).subscribe(res=>{
  this.headerText = "Update Question!";
  this.QuestionModel.questionType = res.questionType;
    this.QuestionModel.questionName = res.questionName
    this.QuestionModel.correctAnswer = res.correctAnswer
    this.QuestionModel.option1 = res.option1
    this.QuestionModel.option2 = res.option2
    this.QuestionModel.option3 = res.option3
    this.QuestionModel.option4 = res.option4
    this.changeanswer(res.option1,1)
    this.changeanswer(res.option2,2)
    this.changeanswer(res.option3,3)
    this.changeanswer(res.option4,4)
    if(this.QuestionModel.questionType != "Subjective"){
this.questionTypeChange();
    }
})
    }
    if (this.QuizModel.bookID != undefined && this.QuizModel.bookID != null) {
      this.enableBookList = true;
    }
    
    if (this.quizID != undefined && this.quizID != null) {      
      if(this.page != undefined){
        this.headerText = "Update Quiz!";
        this.buttonname = 'Update';
        this.GetQuizDetails();
      }
      else{
        this.QuizModel.quizid = 0;
        this.showQuestionForm = true;
        this.showQuizForm = false;
        this.headerText = "Create a Question!";
      }     
    }
    else{
      this.QuizModel.instructions = '<div><ol><li>Click <b style="">Start Test</b> to attempt the quiz.<br></li><li>There is no time duration bound on this quiz.</li><li>Click on the <b>Next</b> button to move to the next question into the quiz. Please note that once you click the next button, you can only view the previous question and its result with the click of the&nbsp;<b>Previous</b>&nbsp;button.</li><li>You cannot change the answer once the message displays that says&nbsp;<font color="#28a745" style="font-weight: bold;">Correct answer</font>&nbsp;/ <font color="#dc3545" style="font-weight: bold;">Wrong answer</font>.</li><li>You cannot resume this quiz if interrupted due to any reason. But you can restart it any time.</li><li>Click on <b>Submit</b> button on completion of the quiz. You cannot restart this quiz once the submit button is clicked.<br></li><li>After that, a new screen will be visible with the result of this quiz.</li></ol></div>';
    }
  }
  GetQuizDetails() {
    this.quizService.GetQuizDetails(this.quizID,this.companyid,this.userid,this.individual).subscribe(res=>{
      
      this.QuizModel.quizid = this.quizID
      this.QuizModel.quizName = res.quizName
      this.QuizModel.description = res.description
      this.QuizModel.bookID = res.bookID
      this.QuizModel.bookTitle = res.bookTitle
      this.QuizModel.instructions = res.instructions;
      let bookdropdownobj :any={};
      bookdropdownobj.id = res.bookID
      bookdropdownobj.title = res.bookTitle
      this.bookList.push(bookdropdownobj)
      this.enableBookList = true

      let instructions = "";
    })
  }

  addQuiz(form:NgForm){
    ;
    this.btnQuizClick = true;
    if(form.valid){      
      this.QuizModel.userDetailID = this.userid;
      this.quizService.saveQuiz(this.QuizModel).subscribe(res=>{
        if(res.code == 200){
          ;
          if(this.page != undefined){
            this.toaster.success("Quiz successfully updated")
            this.superadmin ? this._router.navigateByUrl('/Admin/quiz') : this._router.navigateByUrl('/Main/quiz')
          }
          else{
            this.quizID = res.quizID;
            this.showQuestionForm = true;
            this.showQuizForm = false;
            this.headerText = "Create a Question!";
          }
         
        }
      });
    }
  }

  addQuestion(form:NgForm){
    this.btnQuestionClick = true;
    if(form.valid){
      this.QuestionModel.userDetailID = this.userid;
      this.QuestionModel.quizID = this.quizID;
      this.QuestionModel.quesID = this.quesID;
      this.quizService.saveQuestion(this.QuestionModel).subscribe(res=>{
        if(res.code == 200){
          this.quesIdList.push(this.QuestionModel.quesID)
          this.toaster.success(res.message);
          this.btnQuestionClick = false;
          this.createbtnwidth = "col-lg-6 col-md-6"
          this.reset();
          if(this.quesID != 0){
            this.superadmin ? this._router.navigateByUrl('/Admin/quiz') : this._router.navigateByUrl('/Main/quiz')
          }
        }
      },err=>{
        this.toaster.error("Something went wrong please try again after a moment!");
      });
    }
  }

  questionTypeChange(){
    this.showOptionRowOne = false;
    this.showOptionRowTwo = false;
    if(this.QuestionModel.questionType === "Yes/No"){
      this.showOptionRowOne = true;
    }
    else if(this.QuestionModel.questionType === "Multiple Choice Question"){
      this.showOptionRowOne = true;
      this.showOptionRowTwo = true;
    }
  }

  getBookByCompanyID(){
    this.bookService.getBookByCompanyID(this.companyid,this.userid,this.individual).subscribe(res => {
      
      this.bookList = res;
    });
  }

  reset(){
    this.QuestionModel.questionType = "";
    this.QuestionModel.questionName = "";
    this.QuestionModel.correctAnswer = "";
    this.QuestionModel.option1 = "";
    this.QuestionModel.option2 = "";
    this.QuestionModel.option3 = "";
    this.QuestionModel.option4 = "";
    this.optList=[]
  }
  changeanswer(value,optionNumver){
    
let optionObj:any={}
optionObj.id = optionNumver
optionObj.value = value
var isOptionAlredyExist = this.optList.filter(x=>x.id == optionNumver)
if( isOptionAlredyExist.length == 0){
  this.optList.push(optionObj)

}
else{
  isOptionAlredyExist.value = value
}
  }

  publishquiz(){
    this.quizService.ChangePublishedSetting(this.quizID,true).subscribe(res=>{
      if(res.code=200){
      this.toaster.success("Quiz has been successfully published");
       window.location.reload();
  
      }
    })
  }
}
