import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailService {
    Url: string;
    header: any;
    loggedInUserDetails: any;
    private _refreshNeeded$ = new Subject<void>();
  
    get refreshNeeded$() {
      return this._refreshNeeded$;
    }
    constructor(private http: HttpClient) { 
      this.Url = environment.baseUrl + "CompanyDetail/";
      this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
      var token = "";
      if (this.loggedInUserDetails !== null){
        token = this.loggedInUserDetails.token;
      }
      const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
      this.header = new HttpHeaders(headerSettings);
    }
    GetProfileByID(companyID):Observable<any>{
        return this.http.get(this.Url+"GetProfileByID?id="+companyID, { headers: this.header });
      }
    GetAllCompanies(){
        return this.http.get(this.Url+"GetCompanies", { headers: this.header });
      }
}