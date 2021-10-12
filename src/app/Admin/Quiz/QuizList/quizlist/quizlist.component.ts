import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSlideToggleChange, MatSort, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from '../../../../Shared/Services/quiz.service';

@Component({
  selector: 'app-quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuizlistComponent implements OnInit {
  isTableExpanded = false;
  displayedColumns: string[] = ['quizname', 'bookname', 'ispublished', 'action'];
  dataSource: MatTableDataSource<any>;
  displayedAnswerColumns: string[] = ['questionName', 'questionType', 'correctAnswer', 'action'];
  AnswerdataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  List: Array<any> = [];
  searchKey: any;
  companydetails: any;
  userid: any;
  companyid: any;
  usertypeid: any;
  individual: boolean = false;
  superadmin: boolean=false;
  constructor(private quizService: QuizService, private toaster: ToastrService) { }

  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.companyid = this.companydetails.companyId
    this.usertypeid = this.companydetails.usertypeid;
    if (this.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e') {
      this.individual = true;
    }
    else if (this.usertypeid == '4ba19173-94cd-4222-af7c-60c91d446f8e') {
      this.superadmin = true;
    }
    this.quizService.GetQuizList(this.companyid,this.userid,this.individual).subscribe(res => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  getQuestionList(element) {
    this.dataSource.data.forEach(field => {
      if (field != element) {
        
        field.isExpanded = false;
      }
    });
    element.isExpanded = !element.isExpanded;
    this.AnswerdataSource = new MatTableDataSource();
    if (element.questionlist != null || element.questionlist != undefined) {
      this.List = [];
      element.questionlist.forEach(element => {
        this.List.push(element);


      });
    }

    this.AnswerdataSource.data = this.List
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  DeleteQuiz(quizID) {
    if (confirm('Are you sure to delete this Quiz?')) {
      this.quizService.DeleteQuiz(quizID).subscribe(res => {
        if (res.code == 200) {
          this.toaster.success(res.message)
          this.ngOnInit();
        }
      })
    }
  }

  DeleteQuestion(quesID) {
    if (confirm('Are you sure to delete this Quiz?')) {
      this.quizService.DeleteQuestion(quesID).subscribe(res => {
        if (res.code == 200) {
          this.toaster.success(res.message)
          this.ngOnInit();
        }
      })
    }
  }

  activeToggle($event: MatSlideToggleChange,quizid) {
    this.quizService.ChangePublishedSetting(quizid,$event.checked).subscribe(res=>{
      if(res.code==200){
       this.ngOnInit();
  
      }
    })
  } 
}
