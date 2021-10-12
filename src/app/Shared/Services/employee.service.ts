import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private _http:HttpClient) {
    this.Url = environment.baseUrl + "Employee/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
   } 
  
  AddNewEmployee(model):Observable<any>{
    
    return this._http.post(this.Url+"AddEmployee",model, { headers: this.header });
  }
  GetAllRole():Observable<any>{
    
    return this._http.get(this.Url+"GetAllRole", { headers: this.header });
  }
  GetAllMentor(companyid):Observable<any>{
    
    return this._http.get(this.Url+"GetAllMentor?companyid="+companyid, { headers: this.header });
  }
  GetAllEmployee(id):Observable<any>{
    return this._http.get(this.Url+"GetAllEmployee?companyid="+id, { headers: this.header });
  }
  
  DeleteEmployee(id):Observable<any>{
    return this._http.get(this.Url+"DeleteEmployee?id="+id, { headers: this.header });
  }

  GetEmployeebyid(id):Observable<any>{
    return this._http.get(this.Url+"GetEmployeeById?id="+id, { headers: this.header });
  }

  UpdateEmployee(model):Observable<any>{
    return this._http.post(this.Url+"UpdateEmployee",model, { headers: this.header });
  }
  
  GetProfileByEmail(email):Observable<any>{
    return this._http.get(this.Url+"GetProfileByEmail?email="+email, { headers: this.header });
  }
  
  GetMentorProfileByEmail(email):Observable<any>{
    return this._http.get(this.Url+"GetMentorProfileByEmail?email="+email, { headers: this.header });
  }
  
  GetEmployeeByMentorID(mentorID):Observable<any>{
    return this._http.get(this.Url+"GetEmployeeByMentorID?mentorID="+mentorID, { headers: this.header });
  }
}
