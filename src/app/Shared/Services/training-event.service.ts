import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingEventService {
  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { 
    this.Url = environment.baseUrl + "TrainingEvent/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
  }
  GetEvent(CompanyId,userDetailID,isIndividual){   
    var url = this.Url+"GetEvent?CompanyId="+CompanyId+"&userDetailID="+userDetailID+"&isIndividual="+isIndividual;
    return this.http.get<any>(url,{ headers: this.header });
  }
  CreateEvent(BookModel){
    var url = this.Url+"CreateEvent";
    return this.http.post<any>(url,BookModel,{ headers: this.header });
  }
  CloseEvent( closeNote,  eventId){
    var url = this.Url+"CloseEvent?closeNote="+closeNote+"&eventId="+eventId;
    return this.http.post<any>(url,null,{ headers: this.header });
  }
  GetEventFormat(){
    var url = this.Url+"GetEventFormat";
    return this.http.get<any>(url,{ headers: this.header });
  }
  GetEventById(ID){
    
    var url = this.Url+"GetEventById?id="+ID;
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"));
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
    return this.http.post<any>(url,null,{ headers: this.header });
  }

  GetSelectEmployeeToAttendTrainingEvent(eventId,companyid){
    var url = this.Url+"GetSelectEmployeeToAttendTrainingEvent?traingeventid="+eventId+"&companyId="+companyid;
    return this.http.get<any>(url,{ headers: this.header });
  }

  // CreateSelectedEmployeeToEvent(employeelisttosend){
  //   var url = this.Url+"CreateSelectedEmployeeToEvent";
  //   return this.http.post<any>(url,employeelisttosend,{ headers: this.header });
  // }
  GetSelectedEmployeeToAttendTrainingEvent(eventId,isActive){
    var url = this.Url+"GetSelectedEmployeeToAttendTrainingEvent?traingeventid="+eventId+"&isActive="+isActive;
    return this.http.get<any>(url,{ headers: this.header });
  }
  CreateEmployeeToEventAttendee(employeelisttosend){
    var url = this.Url+"CreateEmployeeToEventAttendee";
    return this.http.post<any>(url,employeelisttosend,{ headers: this.header });
  }
  UpdateAttendeelogsbyAtendeeid(employeelisttosend){
    var url = this.Url+"UpdateAttendeelogsbyAtendeeid";
    return this.http.post<any>(url,employeelisttosend,{ headers: this.header });
  }
  DeleteEvent( id){
    var url = this.Url+"DeleteEvent?id="+id;
    return this.http.post<any>(url,null,{ headers: this.header });
  }

 
  
  GetTrainingEventAttendeeByMentorIDAndEmployeeID(mentorID, isActive, employeeID){
    var url = this.Url+"GetTrainingEventAttendeeByMentorIDAndEmployeeID?mentorID=" + mentorID + "&isActive=" + isActive + "&employeeID=" + employeeID;
    return this.http.get<any>(url,{ headers: this.header });
  }

  IsInvitedToTrainingEvent(trainingEventID, employeeID){
    var url = this.Url + "IsInvitedToTrainingEvent?trainingEventID=" + trainingEventID + "&employeeID=" + employeeID;
    return this.http.get<any>(url,{ headers: this.header });
  }
  SaveA3FormFields(formfields){
    var url = this.Url+"SaveA3FormFields";
    return this.http.post<any>(url,formfields,{ headers: this.header });
  }
  ApproveEventbyMentorFromEventId(eventid){
    var url = this.Url+"ApproveEventbyMentorFromEventId?eventid="+eventid;
    return this.http.post<any>(url,null,{ headers: this.header });
  }
  SaveA3TrainingEventsCommData(eventid,userid,message){
    var url = this.Url+"SaveA3TrainingEventsCommData?eventid="+eventid+"&userid="+userid+"&message="+message;
    return this.http.post<any>(url,null,{ headers: this.header });
  }
  ApproveEventbyDollarApproverFromEventId(eventid){
    var url = this.Url+"ApproveEventbyDollarApproverFromEventId?eventid="+eventid;
    return this.http.post<any>(url,null,{ headers: this.header });
  }
  GetA3TrainingEventsCommData(eventid){
    
    var url = this.Url+"GetA3TrainingEventsCommData?eventid="+eventid;
    return this.http.get<any>(url,{ headers: this.header });
  }
  GetA3FormDataById(ID){
    
    var url = this.Url+"GetA3FormDataById?eventid="+ID;
    return this.http.get<any>(url,{ headers: this.header });
  }
  GetA3TrainingEventsByCompanyID(companyID, isActive){
    var url = this.Url+"GetA3TrainingEventsByCompanyID?companyID=" + companyID + "&isActive=" + isActive + "&isActive=" + isActive;
    return this.http.get<any>(url,{ headers: this.header });
  }

  GetKaizenBoard(companyID){
    var url = this.Url+"GetKaizenBoard?companyID=" + companyID;
    return this.http.get<any>(url,{ headers: this.header });
  }

  //Kaizen tools---
  SaveKaizenFormFields(formfields){
    var url = this.Url+"SaveKaizenFormFields";
    return this.http.post<any>(url,formfields,{ headers: this.header });
  }
  GetKaizenFormDataById(ID){
    var url = this.Url+"GetKaizenFormDataById?eventid="+ID;
    return this.http.get<any>(url,{ headers: this.header });
  }
  GetKaizenTrainingEventsByCompanyID(companyID, isActive){
    var url = this.Url+"GetKaizenTrainingEventsByCompanyID?companyID=" + companyID + "&isActive=" + isActive + "&isActive=" + isActive;
    return this.http.get<any>(url,{ headers: this.header });
  }
}
