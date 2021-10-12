import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private _http:HttpClient) {
    this.Url = environment.baseUrl + "Mentor/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
   } 
  
  AddMentor(model):Observable<any>{
    
    return this._http.post(this.Url+"AddMentor",model, { headers: this.header });
  }

  GetAllMentor(id):Observable<any>{
    
    return this._http.get(this.Url+"GetAllMentors?companyid="+id, { headers: this.header });
  }

  GetAllMentorAnms(id):Observable<any>{
    
    return this._http.get(this.Url+"GetAllMentorsAnonymous?companyid="+id, { headers: this.header });
  }
  
  DeleteMentor(id):Observable<any>{
    return this._http.get(this.Url+"DeleteMentor?id="+id, { headers: this.header });
  }

  GetMentorbyid(id):Observable<any>{
    return this._http.get(this.Url+"GetMentorById?id="+id, { headers: this.header });
  }

  UpdateMentor(model):Observable<any>{
    return this._http.post(this.Url+"UpdateMentor",model, { headers: this.header });
  }
  
  GetMentorsByIsActive(companyId, isActive):Observable<any>{
    
    return this._http.get(this.Url+"GetMentorsByIsActive?companyID=" + companyId + "&isActive=" + isActive, { headers: this.header });
  }

  GetMentorByEmployeeID(employeeID):Observable<any>{
    return this._http.get(this.Url + "GetMentorByEmployeeID?employeeID=" + employeeID, { headers: this.header});
  }
}
