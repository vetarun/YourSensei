import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyDetailService } from '../../../Shared/Services/companydetail.service';
import { BookService } from '../../../Shared/Services/book.service';
import { environment } from '../../../../environments/environment';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { NgForm } from '@angular/forms';
import { QuizService } from '../../../Shared/Services/quiz.service';
import { Useranswer } from '../../../Models/Quiz/Useranswer';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {
  companydetails: any;
  usertypeid: any;
  CompanyForm: any;
  companylist: Object;
  isLengthForNewBook: boolean;
  search_width: any;
  searchBar_Width: any;
  BookReadModel: any = {}
  first_name: any;
  last_name: any;
  bookID: any;
  btnclick: boolean;
  NewbookaddedbySuperAdmin: any = [];
  bookaddedtosend: any = {};
  @ViewChild("template", null) templateRef: TemplateRef<any>;
  parenBookId: any;
  selectedfile: File = null;
  value: number = 0;
  //pageSettings = pageSettings;
  selectedoption: boolean = false;
  show: boolean = false;
  selectedItems: any;
  lstquestion: any = [];
  lstserviceprovider: any;
  answer: string;
  useranswer: any
  active: any;
  queanswer: any = [];
  queanswerobj: any = [];
  quesID: any = [];
  skipque: any = [];
  skipq: any = [];
  var1: [];
  anslist: Array<any> = [];
  showQuiz: boolean = false;
  instructionread:boolean=false
  buttonDisabled: boolean = true;
  prevbuttonDisabled: boolean = true;
  correctAns: number = 0;
  totalnoOFQues: number = 0;
  TotalPercentage: number = 0;
  disabledQuiz: boolean = false;
  showPercentage: boolean = false;
  ShowQuestionResult: boolean = false;
  IsAnsCorrect: boolean = false;
  bookId: any;
  instructions: any;
  globalBooks: Object;
  trackCategory
  constructor(private SpinnerService: NgxSpinnerService, private quizService: QuizService, private modalService: NgbModal, private companyDetailservice: CompanyDetailService, private bookService: BookService,
    private toastr: ToastrService, private _router: Router, private materialModule: MaterialModule) { }
  displayedColumns: string[] = ['coverImageUrl', 'title', 'author', 'publisher', 'year', 'rating','trackCategory', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  booklist: any
  userRole
  searchKey
  bookcategorylist
  userid
  companyid;
  editable;
  IsAverage: Object;
  companyuser: boolean = false;
  companyadmin: boolean = false;
  individual: boolean = false;
  superadmin: boolean = false;
  selectAllCheckbox: boolean = false;
  newBookdataSource: MatTableDataSource<any>;
  isGlobalBooks: boolean = false;
  mentor: boolean = false;
  mentorID: any;
  mentorSearchBarClass: any;

  ngOnInit() {

    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.userRole = this.companydetails.roles;
    this.companyid = this.companydetails.companyId
    this.usertypeid = this.companydetails.usertypeid;
    this.mentorID = this.companydetails.mentorID;
    this.mentor = false;
    this.searchBar_Width = "search-div col-sm-10";
    

    if (this.usertypeid == '5c37cf64-f617-4399-bb68-645b0c3969a2') {
      this.companyuser = true;
      this.searchBar_Width = "search-div col-sm-12";
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
    else if(this.usertypeid == "c6156716-6d16-4e75-9660-056a59b7b546" || this.usertypeid == "2d2e4aec-d852-417a-8a54-fe80504d83eb"){
      this.mentor = true;
      this.searchBar_Width = "search-div col-sm-12";
    }
    this.bookService.toShowAverageRating(this.companyid).subscribe(res => {
      
      this.IsAverage = res
      if (this.IsAverage == true) {
        this.displayedColumns = ['coverImageUrl', 'title', 'author', 'publisher', 'year', 'rating', 'averageRating','trackCategory', 'action'];
      }
      console.log(this.IsAverage)
    })

    if (this.companydetails.name != "") {
      
      var fullname = this.companydetails.name.split(" ");
      this.first_name = fullname[0];
      if (fullname[1] != "")
        this.last_name = fullname[1];
      else {
        this.last_name = fullname[2];
      }

      // this.first_name = this.companydetails.name.split(" ")[0];
      // this.last_name = this.companydetails.name.split(" ")[1];
    }
    
    this.search_width = "col-sm-12";
    if (this.superadmin) {
      this.displayedColumns = ['coverImageUrl', 'title', 'companyName', 'author', 'publisher', 'year', 'rating','trackCategory', 'action'];
      this.search_width = "col-sm-5";
    }

    this.getBooks()

    this.fetchCompanyList();
    //this.getTrackCategory();
    this.cleartext();
  }
 

  getBooks() {
    this.dataSource = new MatTableDataSource();
    this.bookService.GetBooks(this.companyid, this.userid,this.individual).subscribe(res => {
      console.log(res)
      res.forEach(function (value) {
        
        var imageUrl = environment.baseUrl + 'Images/' + value.coverImageUrl;
        value.coverImageUrl = imageUrl;
    
        if(value.trackCategory != null){
          if(value.trackCategory != '')
          value.trackCategory = value.trackCategory.split("-")[0] +  value.trackCategory.split("-")[1]
        }
      });
      this.getNotAcceptedCompanyLibraryBookLogs();
      // for (var i = 0; i < res.listOfNewBooks.length; i++) {
      //   this.NewbookaddedbySuperAdmin.push({
      //     'index': i, 'IsSelected': false, 'bookid': res.listOfNewBooks[i].id, 'title': res.listOfNewBooks[i].title,
      //     'publisher': res.listOfNewBooks[i].publisher, 'author': res.listOfNewBooks[i].author,
      //     'year': res.listOfNewBooks[i].year
      //   })

      // }
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
      this.isGlobalBooks = false;
      if(this.companyid === "00000000-0000-0000-0000-000000000000"){
        this.isGlobalBooks = true;
      }
    })
  }

  getNotAcceptedCompanyLibraryBookLogs(){
    this.bookService.GetNotAcceptedCompanyLibraryBookLogs(this.companyid, true).subscribe(res => {
      this.NewbookaddedbySuperAdmin = res;
    })
  }

  checkall(e) {
    this.selectAllCheckbox = e;
    for (var i = 0; i < this.NewbookaddedbySuperAdmin.length; i++) {
      this.NewbookaddedbySuperAdmin[i].IsSelected = e
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load",
      () => {
        // this.imageToShow.photo = reader.result;
      },
      false);

    if (image) {
      if (image.type !== "application/pdf")
        reader.readAsDataURL(image);
    }
  }

  // DeleteBook(id,userid){
  //   
  //   if(userid==localStorage.getItem('userid'))
  //   {
  //     if(confirm('Are you sure to delete this book?'))
  //     {
  //       this.bookService.DeleteBooks(id).subscribe(res=>{
  //         if(res.result.code==200)
  //         {
  //           this.toastr.success(res.result.message)
  //           this.getBooks();
  //         }
  //       },err=>{
  //         this.toastr.error(err.result.message)
  //       })
  //     }
  //   }else{
  //    alert('You dont have right to delete this book!')
  //   } 

  // }
  markbookasreadBtn(content, bookid, parentBookId) {
    this.bookID = bookid
    this.BookReadModel.Rating = "";
    this.BookReadModel.Comments = "";
    this.parenBookId = parentBookId;
   // this.getQuizQuestionList()
    this.modalService.open(content, { backdrop: "static", size: "lg", ariaLabelledBy: 'modal-basic-title' });
    //this.modalService.open(this.templateRef, { backdrop: 'static', size: "lg", ariaLabelledBy: 'modal-basic-title' });
  }
  DeleteBook(id, userid) {
    
    if (userid == this.companyid || this.superadmin) {
      if (confirm('Are you sure to delete this book?')) {
        this.bookService.DeleteBooks(id).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message)
            location.reload();
          }
        }, err => {
          this.toastr.error(err.message)
        })
      }
    }
    else {
      alert('You dont have right to Delete this book!')
    }
  }

  SaveMarkAsRead(form: NgForm, modal) {
    
    this.btnclick = true
    
    if (form.valid) {
      
      this.BookReadModel.companyID = this.companyid;
      this.BookReadModel.employeeID = this.userid;
      this.BookReadModel.bookID = this.bookID;
      this.BookReadModel.FirstName = this.first_name;
      this.BookReadModel.LastName = this.last_name;
      this.BookReadModel.Rating = Number(this.BookReadModel.Rating)
      this.SpinnerService.show()
      this.bookService.MarkBookRead(this.BookReadModel).subscribe(res => {
        

        if (res.code == 200) {
          this.toastr.success(res.message)
          modal.dismiss()
          this.getQuizQuestionList(false, this.bookID);
          this.SpinnerService.hide()

        }
        else if (res.code == 201) {
          this.SpinnerService.hide()
          // // //this.markbookbutton= true;
          this.toastr.error(res.message)
          this.ngOnInit();
        }
        else {
          this.toastr.error(res.message)
        }
      }, err => {
        this.SpinnerService.hide();
        this.toastr.error(err.result.message)
      })
    }
  }
  getQuizQuestionList(openQuiz, bookid) {
    debugger;
    this.showQuiz = openQuiz;
    this.bookID = bookid;
    this.quizService.GetQuestionListByBookID(this.bookID, this.userid).subscribe(res => {
      
      this.totalnoOFQues = res.length
      if (this.totalnoOFQues > 0) {
        this.lstquestion = res;
        this.active = this.lstquestion[0].questionid;
        this.queanswer = this.lstquestion[0].useranswer;
this.instructions = res[0].instruction
        if (this.queanswer != null) {
          this.buttonDisabled = false;
        }

        
      }
      this.modalService.open(this.templateRef, { backdrop: 'static', size: "lg", ariaLabelledBy: 'modal-basic-title' });
      // else {
      //   this.ngOnInit();
      // }
    })
  }
  // MarkBookRead(id,userid){
  //   
  //   this.bookService.MarkBookRead(id,userid,this.userid).subscribe(res=>{
  //     if(res.code==200)
  //     {
  //       this.toastr.success(res.message)
  //       this.getBooks();
  //     }
  //   },err=>{
  //     this.toastr.error(err.message)
  //   })

  // }

  // EditBook(id,userid){
  //   
  //   if(userid==this.userid)
  //   {
  //   if(userid == "00000000-0000-0000-0000-000000000000"){
  //     alert('You dont have right to edit this book!')
  //   }
  //   else{
  //     this._router.navigate(['/add-book', id]);
  //   }
  // }
  //   else{
  //     alert('You dont have right to edit this book!')
  //   }
  // }


  fetchCompanyList() {
    this.companyDetailservice.GetAllCompanies().subscribe(res => {
      this.companylist = res
      console.log(res);
    })
  }

  searchbycompanyid() {
    this.getBooks()
  }
  checkbook(e, index) {
    
    var allSelected = false;
    this.NewbookaddedbySuperAdmin[index].IsSelected = e
    for (var i = 0; i < this.NewbookaddedbySuperAdmin.length; i++) {
      if (this.NewbookaddedbySuperAdmin[i].IsSelected === true) {
        allSelected = true;
      }
      else {
        allSelected = false;
        break;
      }
    }

    this.selectAllCheckbox = allSelected;
  }
  AddGlobalBookInList() {
    this.bookaddedtosend.selectedIds = [];
    for (var i = 0; i < this.NewbookaddedbySuperAdmin.length; i++) {
      if (this.NewbookaddedbySuperAdmin[i].IsSelected)
        this.bookaddedtosend.selectedIds.push(this.NewbookaddedbySuperAdmin[i].companyLibraryBookLogID)
    }
    this.bookaddedtosend.companyID = this.companyid;
    this.bookaddedtosend.userDetailID = this.userid;
    
    this.bookService.AddBookFromGlobalBook(this.bookaddedtosend).subscribe(res => {
      if (res.code == 200) {

        this.toastr.success("Successfully Added")


        this.ngOnInit();

      }

    })
  }
  EditBook(id, userid) {
    if (userid == this.companyid || this.superadmin) {
      if (this.superadmin) {
        this._router.navigate(['/Admin/add-book', id]);
      }
      else {
        this._router.navigate(['/Main/add-book', id]);
      }

    }
    else {
      alert('You dont have right to edit this book!')
    }



  }

  addbook() {
    
    if (this.superadmin) {
      this._router.navigate(['/Admin/add-book']);
    }
    else {
      this._router.navigateByUrl('/Main/add-book')
    }
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }



  checkforedit(bookid, employeeid) {
    this.bookService.fetchbookread(bookid, employeeid).subscribe(res => {
      this.editable = res
      console.log(this.editable)
    })
  }


  getselectTabId(id: number): any {
    let rtndata: any;
    rtndata = this.lstquestion.filter(
      code => code.questionid === id);
    return rtndata[0]
  }

  reviewlater() {
    //var skipq:any=[];
    
    for (let a in this.skipque) {
      // var temp:any=[];
      // temp=this.getselectTabId(Number(this.skipque[a]));
      //console.log(temp);
      this.skipq.push(this.getselectTabId(Number(this.skipque[a])));



      //this.lstquestion.filter(x=>x.questionid===a)
    }

    this.lstquestion = this.skipq;
    this.active = this.lstquestion[0].questionid;
    this.value = 0;
    //this.value=this.value-((1/(this.lstquestion.length-1))*100);
    this.show = false;
    this.buttonDisabled = true;
    this.prevbuttonDisabled = true;


  }
  onCheckboxChange(question: any) {

    
    //var skipque:any=[];
    if (question.target.checked == true) {
      this.skipque.push(question.target.value);
      this.show = true;
      this.buttonDisabled = false;
      // this.next(question+1);

    }
    else {
      this.skipque.pop(question.target.value);
      this.show = false;
      this.buttonDisabled = true;
      // this.next(question+1);

    }

  }
  onKeypressEvent(answer) {
    
    if (answer != null) {
      this.buttonDisabled = false

    }
    else {
      this.buttonDisabled = true;
    }
  }
  changeanswer(answers, questionumber) {
    
    if (answers != null) {
      this.queanswer = answers;
      this.ShowQuestionResult = true;
      this.show = true;
      this.buttonDisabled = false;
      this.useranswer = answers
      //add answer here
      for (var i = 0; i < this.lstquestion.length; i++) {
        if (questionumber == this.lstquestion[i].questionid) {
          this.lstquestion[i].useranswer = this.useranswer
          let checkid: any
          checkid = this.anslist.filter(u => u.questionid === questionumber)
          if (!checkid.length) {
            let queans = new Useranswer();
            queans.quizid = this.lstquestion[i].quizid
            queans.questionid = questionumber;
            queans.defaultanswer = this.lstquestion[i].defaultans;
            queans.useranswer = this.useranswer;
            queans.userdetailid = this.userid;
            queans.companyid = this.companyid;
            queans.bookid = this.bookID
            queans.firstname = this.first_name
            queans.lastname = this.last_name
            this.anslist.push(queans);
            if (this.lstquestion.length == this.anslist.length) {
              this.CalculatePercentage()

            }
          }
          else {
            checkid.useranswer = this.useranswer
          }

        }
      }
    }
  }

  previous(questionumber: any, index: any) {
    
    this.active = this.lstquestion[index].questionid;
    this.queanswer = this.lstquestion[index].useranswer;

    this.value = this.value - ((1 / (this.lstquestion.length - 1)) * 100);
    this.show = false;
    if (this.lstquestion[index + 1].useranswer != null && this.queanswer != null || this.queanswer != null) {
      this.buttonDisabled = false;
      this.ShowQuestionResult = true
    }
    else {
      this.buttonDisabled = true;
      this.ShowQuestionResult = false
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
    
    this.CalculatePercentage();    
    this.active = this.lstquestion[index].questionid;
    this.queanswer = this.lstquestion[index].useranswer;
    this.value = this.value + ((1 / (this.lstquestion.length - 1)) * 100);
    if (this.queanswer != null) {
      this.show = true
      this.buttonDisabled = false
      this.ShowQuestionResult = true
    }
    else {
      this.show = false
      this.buttonDisabled = true
      this.ShowQuestionResult = false
    }

    if (index == 0)
      this.prevbuttonDisabled = true;
    else
      this.prevbuttonDisabled = false;
  }



  CalculatePercentage() {
    
    let num = 0;
    for (var i = 0; i < this.lstquestion.length; i++) {

      if (this.lstquestion[i].defaultans == this.lstquestion[i].useranswer) {
        num = num + 1;
      }
    }
    this.correctAns = num
    this.TotalPercentage = (this.correctAns / this.totalnoOFQues) * 100
  }


  submit() {
    debugger;
    this.SpinnerService.show()
    this.quizService.SaveQuizAnswerAssessment(this.anslist,this.TotalPercentage).subscribe(res => {
      this.SpinnerService.hide();
      if (res.code == 200) {
        
        this.showPercentage = true;
        this.toastr.success(res.message)

      }
      else{
        this.toastr.success(res.message)
      }
    })
  }


  quizClosed() {
    debugger;
    this.modalService.dismissAll();
    window.location.reload();
  }
  instructionhide(){
    this.instructionread = true;
  }
  // mark the correct answer regardless of which option is selected once answered
  isCorrect(option: string): boolean {
    return this.useranswer && option === this.queanswer;
  }

  // mark incorrect answer if selected
  isIncorrect(option: string): boolean {
    
    return option !== this.queanswer && option === this.useranswer;
  }

  startQuiz(){
    debugger;
    this.showQuiz = true;
  }
  addquizBtn(content,bookid){
    this.bookId = bookid
    this.modalService.open(content, { backdrop: "static", size: "lg", ariaLabelledBy: 'modal-basic-title' });
  }


}