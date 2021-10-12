
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { 
    this.Url = environment.baseUrl + "Authentication/";
    
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
  }
  login(name,passwprd){   
    var url = this.Url+"Login?UserName="+name+"&Password="+passwprd;
    return this.http.post<any>(url, { headers: this.header });
  }
  ForgotPassword(email:any){
    var url = this.Url+"ForgotPassword?email="+email;
    return this.http.post<any>(url, { headers: this.header });
  }
  ResetPassword(link,password,email,oldpassword){
    var url="";
    if(oldpassword==null){
      url = this.Url+"ResetPassword?link="+link+"&password="+password+"&email="+email+"&oldpassword="+oldpassword;
    }
    else{
      
      url = this.Url+"ChangePassword?link="+link+"&password="+password+"&email="+email+"&oldpassword="+oldpassword;
    }
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
    return this.http.post<any>(url, null, { headers: this.header });
  }
  signUp(model){
    
    var url = this.Url+"SignUp";
    return this.http.post<any>(url,model, { headers: this.header });
  }

  SendSupport(model){
    
    var url = this.Url+"SendSupport";
    return this.http.post<any>(url,model, { headers: this.header });
  }

  GetAllApproval(approved,rejected):Observable<any>{
    
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
    //return this.http.get(this.Url+"AllPendingApproval?approved="+approved+"&rejected="+rejected);
    var url = this.Url+"AllPendingApproval?approved="+approved+"&rejected="+rejected;
    return this.http.get<any>(url, { headers: this.header });
  }

  AddApprovalRejectList(model):Observable<any>{
     
    return this.http.post(this.Url+"AcceptRejectList",model,{headers:this.header});

   // return this.http.get(this.Url+"AllPendingApproval?approved="+approved+"&rejected="+rejected);
  }







  // GetUserProfile(email):Observable<any>{
  //   return this.http.get(this.Url+"GetUserProfile?email="+email, { headers: this.header });
  // }
  // GetProfile(email):Observable<any>{
  //   return this.http.get(this.Url+"GetProfilel?email="+email, { headers: this.header });
  // }
  // GetAllCompanyList(){
  //   return this.http.get(this.Url+"GetCompanyList", { headers: this.header });
  // }

  GetAllEmployeeFromMentor(userid){
    var url = environment.baseUrl + "CreditLog/"+"GetAllEmployeewithMentor?userid="+userid;
    return this.http.get<any>(url, { headers: this.header });
  }

  AddUpdateCardDetails(data){
    
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
    var url = this.Url + "AddUpdateCardDetails";
    return this.http.post<any>(url,data, { headers: this.header });
  }

  GetPaymentCardList(Id,companyId,userDetailId){
    
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
    var url = this.Url + "GetPaymentCardList?Id="+Id+"&companyId="+companyId+"&userId="+userDetailId;
    return this.http.get<any>(url, { headers: this.header });
  }

  GetUserDetails(companyId){
    var url = this.Url+"GetUserDetails?companyId=" +companyId;
    return this.http.get<any>(url, { headers: this.header });
  }

}
