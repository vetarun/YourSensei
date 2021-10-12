import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitialAssessmentService {

  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private _http:HttpClient) {
    this.Url = environment.baseUrl + "InitialAssessment/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
   } 
   GetInitialAssessment():Observable<any>{
    return this._http.get(this.Url+"GetInitialAssessment", { headers: this.header });
  }
  SaveAssessmentAnswer(input):Observable<any>{
    return this._http.post(this.Url+"SaveAssessmentAnswer",input, { headers: this.header });
  }

  GetInitialAssessmentAnswer(sequenceNumber, isActive):Observable<any>{
    return this._http.get(this.Url+"GetInitialAssessmentAnswer?sequenceNumber=" + sequenceNumber + "&isActive=" + isActive, { headers: this.header });
  }
}
