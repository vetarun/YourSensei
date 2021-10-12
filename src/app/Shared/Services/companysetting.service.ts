import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanysettingService {

  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private _http: HttpClient) { 
    this.Url = environment.baseUrl + "CompanySetting/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
  }

  AddCompanySetting(model):Observable<any>{
    return this._http.post(this.Url+"AddCompanySetting",model, { headers: this.header });
  }

  GetAllCompanySetting(id):Observable<any>{
    return this._http.get(this.Url+"GetAllCompanySetting?id="+id, { headers: this.header });
  }
  GetCompanySettingbyId(id):Observable<any>{
    return this._http.get(this.Url+"GetCompanySettingbyId?id="+id, { headers: this.header });
  }
}