import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from '../../../../Shared/Services/quiz.service';

@Component({
  selector: 'app-viewquiz',
  templateUrl: './viewquiz.component.html',
  styleUrls: ['./viewquiz.component.scss']
})
export class ViewquizComponent implements OnInit {
  loggedInUserDetails: any;
  userID: any;
  userTypeID: any;
  mentor: boolean = false;
  employeeList: any;
  mentorID: any;
  employeeID: any;
  quizList: any = [];
  questionList: any = [];
  quizID: number;
  quizName: string;
  participant: string;
  companyName: string;
  bookTitle: string;
  isInternalMentor: boolean = false;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  displayedColumns: string[] = ['questionName', 'userAnswer', 'correctAnswer', 'result'];

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private _router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    if(this.loggedInUserDetails == undefined || this.loggedInUserDetails == null){
      this._router.navigate(['/Main/login'], { queryParams: { 'redirectURL':this._router.url } });
    }else{
      this.userID = this.loggedInUserDetails.userId;
      this.userTypeID = this.loggedInUserDetails.usertypeid;
      this.mentorID = this.loggedInUserDetails.mentorID;
      this.isInternalMentor = this.loggedInUserDetails.isInternalMentor;
      this.quizID = this.activatedRoute.snapshot.queryParams['qid'];
      this.employeeID = this.activatedRoute.snapshot.queryParams['eid'];
  
      this.getQuizAnswerAssessmentByQuizIDAndEmployeeID();
    }
    
  }

  getQuizAnswerAssessmentByQuizIDAndEmployeeID(){
    this.quizService.GetQuizAnswerAssessmentByQuizIDAndEmployeeID(this.quizID, true, this.employeeID).subscribe(res => {
      this.quizList = res;
      this.quizList.forEach(element => {
        
        if(this.questionList !== null){
          var found = this.questionList.some(a => a.questionid === element.questionid);
          if(!found){
            this.questionList.push(element);
          }
        }
        else{
          this.questionList.push(element);
        }
      });
      this.quizName = this.questionList[0].quizName;
      this.participant = this.questionList[0].firstname + " " + this.questionList[0].lastname;
      this.companyName = this.questionList[0].companyName;
      this.bookTitle = this.questionList[0].title;
      this.dataSource = new MatTableDataSource(this.questionList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  copyAnyText(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Copied to clipboard");
  }
}
