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

export class SubscriptionService {

  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { 
    this.Url = environment.baseUrl + "Subscription/";
    
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
  }

  GetSubscriptionPlans(id):Observable<any>{
    return this.http.get(this.Url+"GetSubscriptionPlans?id=" + id, { headers: this.header });
  }

  GetSubscriptions():Observable<any>{
    return this.http.get(this.Url+"GetSubscriptions", { headers: this.header });
  }
  AddUpdateSubscriptionPlans(data):Observable<any>{
    return this.http.post(this.Url+"AddUpdateSubscriptionPlans",data, { headers: this.header });
  }

  GetFeaturesAllowed():Observable<any>{
    return this.http.get(this.Url+"GetFeaturesAllowed", { headers: this.header });
  }

  SubscribePlanToUser(userdetailid, companyid, planID, noOfDays):Observable<any>{
    return this.http.post(this.Url+"SubscribePlanToUser?userdetailid=" + userdetailid + "&companyid=" + companyid + "&planID=" + planID + "&noOfDays=" + 
      noOfDays, null, { headers: this.header });
  }

  SavePayPalTransaction(payPalTransactionInput):Observable<any>{
    return this.http.post(this.Url+"SavePayPalTransaction", payPalTransactionInput, { headers: this.header });
  }
}
