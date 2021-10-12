import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditlogService {
  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { 
    this.Url = environment.baseUrl +"CreditLog/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
  }
  GetCreditLogsByCompanyID( companyID){
    var url = this.Url+"GetCreditLogsByCompanyID?companyID="+companyID;
    return this.http.get<any>(url,{ headers: this.header });
  }

  BindCreditlogOnEmployee(userid,companyID){
    var url = this.Url+"GetCreditLogsByUserID?userid="+userid+"&companyID="+companyID;
    return this.http.get<any>(url,{ headers: this.header });
  }

  ShowMentorsEmployee(userid){
    return this.http.get(this.Url+"IsMentorLoggedIn?userid="+userid, { headers: this.header });
 }

 GetCreditLogsByLoggedInUser(userid,isActive){
  var url = this.Url+"GetCreditLogsByLoggedInUser?userid="+userid+"&isActive=" +isActive;
  return this.http.get<any>(url,{ headers: this.header });
}


}
