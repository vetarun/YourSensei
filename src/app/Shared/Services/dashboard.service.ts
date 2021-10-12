import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  Url: string;
  header: any;
  loggedInUserDetails: any;
  

  constructor(private _http:HttpClient) {
    this.Url = environment.baseUrl + "Dashboard/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
   } 
  
   GetBeltRules(Id,companyId,userDetailId):Observable<any>{
    return this._http.get(this.Url+"GetBeltList?id="+Id+"&companyId="+companyId+"&userId="+userDetailId, { headers: this.header });
  }

  AddUpdateBeltRules(data:any):Observable<any>{
    return this._http.post(this.Url+"AddUpdateBelt",data, { headers: this.header });
  }

  deleteBeltRules(Id,userid):Observable<any>{
    return this._http.get(this.Url+"DeleteBelt?id="+Id+"&userid="+userid, { headers: this.header });
  }
  GetDashboardBeltDetails(companyId,UserId,employeeID,mentor){
    return this._http.post(this.Url+"GetDashboardBeltDetails?companyId="+companyId+"&UserId="+UserId+"&employeeID="+employeeID+"&mentor="+mentor,null, { headers: this.header });
  }

  GetCreditStandings(companyId,UserId,isMentor):Observable<any>{
    return this._http.get(this.Url+"GetCreditStandings?companyId="
    +companyId+"&userDetailID="+UserId+"&isMentor="+isMentor, { headers: this.header });
  }
}
