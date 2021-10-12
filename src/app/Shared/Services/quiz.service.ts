import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private _http:HttpClient) {
    this.Url = environment.baseUrl + "Quiz/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
   } 
   GetQuestionListByBookID(bookId,userID):Observable<any>{
    return this._http.get(this.Url+"GetQuestionListByBookID?bookId="+bookId+"&userID="+userID, { headers: this.header });
  }

  SaveQuizAnswerAssessment(input,score):Observable<any>{
    return this._http.post(this.Url+"SaveQuizAnswerAssessment?score="+score,input, { headers: this.header });
  }

  GetQuizList(companyID,userID,isIndividual):Observable<any>{
    return this._http.get(this.Url+"GetQuizList?companyID="+companyID+"&userID="+userID+"&isIndividual="+isIndividual, { headers: this.header });
  }
  GetQuestionDetails(quesID):Observable<any>{
    return this._http.get(this.Url+"GetQuestionDetails?quesID="+quesID, { headers: this.header });
  }
  GetQuizDetails(quizID,companyID,userID,isIndividual):Observable<any>{
    return this._http.get(this.Url+"GetQuizDetails?quizID="+quizID+"&companyID="+companyID+"&userID="+userID+"&isIndividual="+isIndividual, { headers: this.header });
  }
  saveQuiz(quizModel): Observable<any>{
    return this._http.post(this.Url + "SaveQuiz", quizModel, { headers: this.header });
  }

  saveQuestion(questionModel): Observable<any>{
    return this._http.post(this.Url + "SaveQuestion", questionModel, { headers: this.header });
  }
  DeleteQuiz(quizID): Observable<any>{
    return this._http.post(this.Url + "DeleteQuiz?quizID="+quizID,null, { headers: this.header });
  }
  DeleteQuestion(quesID): Observable<any>{
    return this._http.post(this.Url + "DeleteQuestion?quesID="+quesID,null, { headers: this.header });
  }
  ChangePublishedSetting(quizID,IsPublished): Observable<any>{
    return this._http.post(this.Url + "ChangePublishedSetting?quizID="+quizID+"&IsPublished="+IsPublished,null, { headers: this.header });
  }
  GetQuizByMentorIDAndEmployeeID(mentorID, isActive, employeeID): Observable<any>{
    return this._http.get(this.Url + "GetQuizByMentorIDAndEmployeeID?mentorID=" + mentorID + "&isActive=" + isActive + "&employeeID=" + employeeID, { headers: this.header });
  }
  GetQuizAnswerAssessmentByQuizIDAndEmployeeID(quizID, isActive, employeeID): Observable<any>{
    return this._http.get(this.Url + "GetQuizAnswerAssessmentByQuizIDAndEmployeeID?quizID=" + quizID + "&isActive=" + isActive + "&employeeID=" + employeeID, { headers: this.header });
  }
}
