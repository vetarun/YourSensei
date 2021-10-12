import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { title } from 'process';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BookService } from '../../../Shared/Services/book.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  companydetails;
  userid;
  userRole;
  companyid;
  BookModel: any = {}
  BookReadModel: any = {}
  btnclick: boolean = false
  path: string
  bookcategorylist: any
  bookid
  trackid
  buttontext = 'Create'
  buttonname;
  getbookid;
  gettrackcategoryid;
  markbookbutton: boolean = false;
  value: any;

  fileToUpload: File = null;
  UploadBookFile: File = null;
  filepathimage;
  bookpathimage;
  progress: number;
  image: any;
  IsCheckbox = false;
  IsSave = true;
  submitclick: boolean = false;
  editable;
  fullname;
  first_name;
  last_name;
  usertypeid: any;
  companyuser: boolean = false;
  companyadmin: boolean = false;
  individual: boolean = false;
  superadmin: boolean = false;
  globalBooks: Object;
  bookimage: any;
  bookstitle = [];
  checked: boolean = false;
  isGlobalBooks: boolean = false;
  booklist_1: any;
  booklist_2: any;
  booklist_3: any;
  booklist_4: any;
  booklist_5: any;
  booklist_6: any;
  booklist_7: any;
  trackcat_1: any;
  trackcat_2: any;
  trackcat_3: any;
  trackcat_4: any;
  trackcat_5: any;
  trackcat_6: any;
  trackcat_7: any;
  trackbook_1: any;
  trackbook_2: any;
  trackbook_3: any;
  trackbook_4: any;
  trackbook_5: any;
  trackbook_6: any;
  trackbook_7: any;
  trackcategoryId: any;
  trackvalidation: boolean = false;
  addascustom: boolean = false;
  addcustom: boolean = false;
  duplicatebook: boolean = false;0
  duplicatetrackname: boolean = false;
  removeupdatebtn: boolean = false;
  addasduplicatebook: boolean = false;

  constructor(private SpinnerService: NgxSpinnerService, private bookService: BookService, private toaster: ToastrService
    , private _router: Router, private router: ActivatedRoute, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.userRole = this.companydetails.roles;
    this.companyid = this.companydetails.companyId;
    this.usertypeid = this.companydetails.usertypeid;

    if (this.usertypeid == '5c37cf64-f617-4399-bb68-645b0c3969a2') {
      this.companyuser = true;
    }
    else if (this.usertypeid == '99f9aeb1-9be6-4e82-8671-ca3df4df16cb') {
      this.companyadmin = true;
    }
    else if (this.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e') {
      this.individual = true;
    }
    else if (this.usertypeid == '4ba19173-94cd-4222-af7c-60c91d446f8e') {
      this.superadmin = true;
    }
    this.BookModel.trackcat_1 = "";
    this.BookModel.trackcat_2 = "";
    this.BookModel.trackcat_3 = "";
    this.BookModel.trackcat_4 = "";
    this.BookModel.trackcat_5 = "";
    this.BookModel.trackcat_6 = "";
    this.BookModel.trackcat_7 = "";

    this.BookModel.trackbook_1 = "";
    this.BookModel.trackbook_2 = "";
    this.BookModel.trackbook_3 = "";
    this.BookModel.trackbook_4 = "";
    this.BookModel.trackbook_5 = "";
    this.BookModel.trackbook_6 = "";
    this.BookModel.trackbook_7 = "";

    this.trackid = this.router.snapshot.queryParamMap.get('id');
    this.buttonname = (this.trackid != null) ? "Update" : "Create";
    this.BookModel.trackid = this.trackid;
    if (this.trackid != undefined && this.trackid != null && this.trackid != '') {
      this.addascustom = true;
      //this.buttonname = "Update";
      this.GetTrackCategoryById(this.trackid);
     }
    // else {
    //   this.buttonname = "Create";
    // }
  }
  getGlobalBooks() {
    this.bookService.GetGlobalBook().subscribe(res => {
      this.globalBooks = res
    });
  }


  changetrack(e, type) {
    debugger
    this.value = e
    if (e != null) {
      this.bookService.GetBookByTrack(e, this.userid, this.companyid, this.individual).subscribe(res => {
        if (type == 1) {
          this.booklist_1 = res;
          this.trackcat_1 = e;
        }
        else if (type == 2) {
          this.booklist_2 = res;
          this.trackcat_2 = e;
        }
        else if (type == 3) {
          this.booklist_3 = res;
          this.trackcat_3 = e;
        }
        else if (type == 4) {
          this.booklist_4 = res;
          this.trackcat_4 = e;
        }
        else if (type == 5) {
          this.booklist_5 = res;
          this.trackcat_5 = e;
        }
        else if (type == 6) {
          this.booklist_6 = res;
          this.trackcat_6 = e;
        }

        else if (type == 7) {
          this.booklist_7 = res;
          this.trackcat_7 = e;
        }
      })

    }
  }

  selectbook(value, type) {
    if (type == 1) {
      this.trackbook_1 = value;
    }
    else if (type == 2) {
      this.trackbook_2 = value;
    }
    else if (type == 3) {
      this.trackbook_3 = value;
    }
    else if (type == 4) {
      this.trackbook_4 = value;
    }
    else if (type == 5) {
      this.trackbook_5 = value;
    }
    else if (type == 6) {
      this.trackbook_6 = value;
    }

    else if (type == 7) {
      this.trackbook_7 = value;
    }
     let isselected = false;
     this.duplicatebook = false;
     for(var i=1; i<=7; i++){
       for(let j=i+1;j<=7; j++){
         if((this["trackbook_" +j] !="" && this["trackbook_" +j] != undefined) && this["trackbook_" +i] == this["trackbook_" +j]){
           isselected = true;
           this.duplicatebook = true;
           break;
         }
       }
       if(isselected )break;
     }
     if(isselected){
      //alert("You have already selected this book of same track. Please select another book!"); 
     }
  }

  AddTrackCategory(form: NgForm) {
    debugger
    this.btnclick = true
    this.SpinnerService.show()
    var trackbooklist = "";
    if (this.trackbook_1 != null && this.trackbook_1 != undefined && this.trackbook_1 != "") {
      trackbooklist = trackbooklist + this.trackbook_1
    }
    if (this.trackbook_2 != null && this.trackbook_2 != undefined && this.trackbook_2 != "") {
      trackbooklist = trackbooklist + "," + this.trackbook_2
    }
    if (this.trackbook_3 != null && this.trackbook_3 != undefined && this.trackbook_3 != "") {
      trackbooklist = trackbooklist + "," + this.trackbook_3
    }
    if (this.trackbook_4 != null && this.trackbook_4 != undefined && this.trackbook_4 != "") {
      trackbooklist = trackbooklist + "," + this.trackbook_4
    }
    if (this.trackbook_5 != null && this.trackbook_5 != undefined && this.trackbook_5 != "") {
      trackbooklist = trackbooklist + "," + this.trackbook_5
    }
    if (this.trackbook_6 != null && this.trackbook_6 != undefined && this.trackbook_6 != "") {
      trackbooklist = trackbooklist + "," + this.trackbook_6
    }
    if (this.trackbook_7 != null && this.trackbook_7 != undefined && this.trackbook_7 != "") {
      trackbooklist = trackbooklist + "," + this.trackbook_7
    }
    // if(trackbooklist == "" && trackbooklist == null &&  trackbooklist == undefined){
    //   this.toaster.error("You must select atleast 1 track record");
    //   this._router.navigateByUrl('/Main/track');
    // }
    this.BookModel.TrackCategories = trackbooklist;
    this.BookModel.UserID = this.userid;
    this.trackvalidation = false;
    if (trackbooklist == "" || trackbooklist == null || trackbooklist == undefined) {
      this.trackvalidation = true;
    }
    this.bookService.GetTrackList(this.userid,this.companyid,this.individual).subscribe(res=>{
      this.duplicatetrackname = false;
      res = res.filter(x => (this.trackid == null || x.trackid != this.trackid))
      console.log(res);
      let track_name = res.forEach(element => {
        if(this.BookModel.trackName == element.trackName){
          this.duplicatetrackname = true;
         // alert("This track name is already in use")
        }
        
      })
    if (form.valid && !this.duplicatetrackname && !this.duplicatebook) {
        this.bookService.AddTrackCategory(this.BookModel).subscribe(res => {
              if (res.code == 200) {
                this.toaster.success(res.message)
                if (this.superadmin) {
                  this._router.navigateByUrl('/Main/suggestedtrack')
                }
                else {
                  this._router.navigateByUrl('/Main/suggestedtrack')
                }
              }
              else if (res.code == 400) {
                this.toaster.error("Something went wrong please try again after a moment!")
              }
      }, err => {
        this.toaster.error("Something went wrong please try again after a moment!")
      });
    }
  })
  }

  GetTrackCategoryById(id) {

    this.trackcategoryId = id;
    this.bookService.GetTrackCategoryById(id).subscribe(res => {
      console.log(res)
      this.BookModel.trackName = res.trackName;
      
      let all_category = res.categorySequesnce.split(",");
      for (let i = 0; i < all_category.length; i++) {
        console.log(all_category[i]);
        switch (i + 1) {
          case 1:
            this.BookModel.trackcat_1 = all_category[i].split("-")[0];
            this.changetrack(this.BookModel.trackcat_1, 1)
            this.BookModel.trackbook_1 = all_category[i]
            this.selectbook(this.BookModel.trackbook_1, 1)
            break;
          case 2:
            this.BookModel.trackcat_2 = all_category[i].split("-")[0];
            this.changetrack(this.BookModel.trackcat_2, 2)
            this.BookModel.trackbook_2 = all_category[i]
            this.selectbook(this.BookModel.trackbook_2, 2)

            break;
          case 3:
            this.BookModel.trackcat_3 = all_category[i].split("-")[0];
            this.changetrack(this.BookModel.trackcat_3, 3)
            this.BookModel.trackbook_3 = all_category[i]
            this.selectbook(this.BookModel.trackbook_3, 3)

            break;
          case 4:
            this.BookModel.trackcat_4 = all_category[i].split("-")[0];
            this.changetrack(this.BookModel.trackcat_4, 4)
            this.BookModel.trackbook_4 = all_category[i]
            this.selectbook(this.BookModel.trackbook_4, 4)

            break;
          case 5:
            this.BookModel.trackcat_5 = all_category[i].split("-")[0];
            this.changetrack(this.BookModel.trackcat_5, 5)
            this.BookModel.trackbook_5 = all_category[i]
            this.selectbook(this.BookModel.trackbook_5, 5)

            break;
          case 6:
            this.BookModel.trackcat_6 = all_category[i].split("-")[0];
            this.changetrack(this.BookModel.trackcat_6, 6)
            this.BookModel.trackbook_6 = all_category[i]
            this.selectbook(this.BookModel.trackbook_6, 6)

            break;
          case 7:
            this.BookModel.trackcat_7 = all_category[i].split("-")[0];
            this.changetrack(this.BookModel.trackcat_7, 7)
            this.BookModel.trackbook_7 = all_category[i]
            this.selectbook(this.BookModel.trackbook_7, 7)

            break;
        }
      }

      if (res.userID == "00000000-0000-0000-0000-000000000000") {
        // this.AddAsCustom();
        this.addcustom = true;
        this.removeupdatebtn = true;
      }
    })
  }

  AddAsCustom(form: NgForm) {
    debugger;
    this.btnclick = true;
    this.addascustom = true;
    this.trackvalidation = false;
    this.bookService.GetTrackCategoryById(this.trackid).subscribe(res => {
      //if (res.userID == "00000000-0000-0000-0000-000000000000") {
        // this.AddAsCustom();
        //this.addcustom = true;
        this.removeupdatebtn = true;
        this.trackvalidation = false;

        //if(this.addcustom = true){
        // this.AddTrackCategory();
        var trackbooklist = "";
        if (this.trackbook_1 != null && this.trackbook_1 != undefined && this.trackbook_1 != "") {
          trackbooklist = trackbooklist + this.trackbook_1
        }
        if (this.trackbook_2 != null && this.trackbook_2 != undefined && this.trackbook_2 != "") {
          trackbooklist = trackbooklist + "," + this.trackbook_2
        }
        if (this.trackbook_3 != null && this.trackbook_3 != undefined && this.trackbook_3 != "") {
          trackbooklist = trackbooklist + "," + this.trackbook_3
        }
        if (this.trackbook_4 != null && this.trackbook_4 != undefined && this.trackbook_4 != "") {
          trackbooklist = trackbooklist + "," + this.trackbook_4
        }
        if (this.trackbook_5 != null && this.trackbook_5 != undefined && this.trackbook_5 != "") {
          trackbooklist = trackbooklist + "," + this.trackbook_5
        }
        if (this.trackbook_6 != null && this.trackbook_6 != undefined && this.trackbook_6 != "") {
          trackbooklist = trackbooklist + "," + this.trackbook_6
        }
        if (this.trackbook_7 != null && this.trackbook_7 != undefined && this.trackbook_7 != "") {
          trackbooklist = trackbooklist + "," + this.trackbook_7
        }

        this.BookModel.TrackCategories = trackbooklist;
        this.BookModel.UserID = this.userid;
        this.BookModel.trackid = null;
        if (trackbooklist == "" || trackbooklist == null || trackbooklist == undefined) {
          this.trackvalidation = true;
        }
        debugger
        this.bookService.GetTrackList(this.userid,this.companyid,this.individual).subscribe(res=>{
          this.duplicatetrackname = false;
          res = res.filter(x => (this.trackid != null || x.trackid == this.trackid))
          console.log(res);
          let track_name = res.forEach(element => {
            if(this.BookModel.trackName == element.trackName){
              this.duplicatetrackname = true;
             // alert("This track name is already in use")
            }
            
          })
        if (form.valid && !this.duplicatetrackname && !this.duplicatebook) {

        this.bookService.AddTrackCategory(this.BookModel).subscribe(res => {
          if (res.code == 200) {
            this.toaster.success(res.message)
            if (this.superadmin) {
              this._router.navigateByUrl('/Main/suggestedtrack')
            }
            else {
              this._router.navigateByUrl('/Main/suggestedtrack')
            }
          }
          else if (res.code == 400) {
            this.toaster.error("Something went wrong please try again after a moment!")
          }

        }, err => {
          this.toaster.error("Something went wrong please try again after a moment!")
        });
      }
      });
      //}
     // else if()
    })
  }
}


