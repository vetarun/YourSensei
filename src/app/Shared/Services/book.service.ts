import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  Url: string;
  header: any;
  loggedInUserDetails: any;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private _http:HttpClient) {
    this.Url = environment.baseUrl + "Library/";
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    var token = "";
    if (this.loggedInUserDetails !== null){
      token = this.loggedInUserDetails.token;
    }
    const headerSettings: { [name: string]: string | string[]; } = {"Authorization": "Bearer " + token};
    this.header = new HttpHeaders(headerSettings);
   } 
 

  GetBooks(companyID,userid,isIndividual):Observable<any>{
    
     return this._http.get(this.Url+"GetBook?companyID="+companyID+"&userID="+userid+"&isIndividual="+isIndividual, { headers: this.header });
  }
  AddBookFromGlobalBook( booktoadd):Observable<any>{
    return this._http.post(this.Url+"AddBookFromGlobalBook",booktoadd, { headers: this.header });
  }
  GetBookCategory():Observable<any>{
    return this._http.get(this.Url+"GetBookCategory", { headers: this.header });
  }

  GetBookById(id):Observable<any>{
    return this._http.get(this.Url+"GetBookById?id="+id, { headers: this.header });
  }
  GetGlobalBook(){
    return this._http.get(this.Url+"GetGlobalBook", { headers: this.header });
  }
  DeleteBooks(id:any):Observable<any>{
    return this._http.get(this.Url+"DeleteBook?id="+id, { headers: this.header });
  }

  MarkBookRead(model):Observable<any>{
    // return this._http.get(this.Url+"MarkBookRead?id="+id+"&userid="+userid+"&employeeid="+employeeid);
    return this._http.post(this.Url+"MarkBookRead",model, { headers: this.header });
  }

  Addbook(model):Observable<any>{
    
    return this._http.post(this.Url+"AddBook",model, { headers: this.header });
  }


  postFile(fileToUpload: File): Observable<any> {
    const endpoint = this.Url+'UploadImage';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    // Display the key/value pairs

    return this._http.post(endpoint, formData, { headers: this.header });   
      
  }

  postBookFile(fileToUpload: File): Observable<any> {  
    const endpoint = this.Url+'UploadBook';
     const formData: FormData = new FormData();
    //FormData formData = new FormData();
    formData.append('fileKeybook', fileToUpload, fileToUpload.name);
    // Display the key/value pairs  
    return this._http.post(endpoint, formData, { headers: this.header });   
      
  }

  fetchbookread(bookid,employeeid){
     return this._http.get(this.Url+"IsBookRead?bookid="+bookid+"&employeeid="+employeeid, { headers: this.header });
  }

  toShowAverageRating(companyID)
  {
    return this._http.get(this.Url+"IsAverageBookRating?companyID="+companyID, { headers: this.header });
  }
  
  getBookByCompanyID(companyID,userID,isIndividual): Observable<any>{
    return this._http.get(this.Url + "GetBookByCompanyID?companyID="+companyID+"&userID="+userID+"&isIndividual="+isIndividual, { headers: this.header });
  }
  
  GetBookReadEventByMentorIDAndEmployeeID(mentorID, isActive, employeeID): Observable<any>{
    return this._http.get(this.Url + "GetBookReadEventByMentorIDAndEmployeeID?mentorID=" + mentorID + "&isActive=" + isActive + "&employeeID=" + employeeID, { headers: this.header });
  }

  GetCompanyLibraryBooksByMentorID(mentorID, isActive, isAccepted): Observable<any>{
    return this._http.get(this.Url + "GetCompanyLibraryBooksByMentorID?mentorID=" + mentorID + "&isActive=" + isActive + "&isAccepted=" + isAccepted, { headers: this.header });
  }
  
  GetNotAcceptedCompanyLibraryBookLogs(companyID, isActive): Observable<any>{
    return this._http.get(this.Url + "GetNotAcceptedCompanyLibraryBookLogs?companyID="+companyID+"&isActive="+isActive, { headers: this.header });
  }

  GetTrackList(userID,companyid,isIndividual): Observable<any>{
    return this._http.get(this.Url + "GetTrackList?userID="+userID+"&companyid="+companyid+"&isIndividual="+isIndividual, { headers: this.header });
  }

  AddTrackCategory(model):Observable<any>{
    
    return this._http.post(this.Url+"AddTrackCategory",model, { headers: this.header });
  }
  
  GetTrackCategoryById(id):Observable<any>{
    return this._http.get(this.Url+ "GetTrackCategoryById?id="+id, { headers: this.header });
  }

  GetBookByTrack(trackcategory,userID,companyid,isIndividual):Observable<any>{
    return this._http.get(this.Url+"GetBookByTrack?trackcategory="+trackcategory+"&userid="+userID+"&companyid="+companyid+"&isIndividual="+isIndividual, { headers: this.header });
  }

  DeleteTrack(id):Observable<any>{
    return this._http.get(this.Url+"DeleteTrack?id="+id, { headers: this.header });
  }
  ChangeInUSeTRack(trackid,inuse): Observable<any>{
    return this._http.post(this.Url + "ChangeInUSeTRack?trackid="+trackid+"&inuse="+inuse ,null, { headers: this.header });
  }
}

