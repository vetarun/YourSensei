import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BookService } from '../../../../Shared/Services/book.service';



@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  companydetails;
  userid;
  userRole;
  companyid;
  BookModel:any={}
  BookReadModel:any={}
  btnclick:boolean=false
  path:string
  bookcategorylist:any
  bookid
  buttontext='Create'
  buttonname;
  getbookid;
  markbookbutton:boolean=false;

  fileToUpload: File = null;
  UploadBookFile:File = null;
  filepathimage;
  bookpathimage;
  progress: number;
  image:any;
  IsCheckbox=false;
  IsSave=true;
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

  constructor(private bookService:BookService,private toaster:ToastrService
    ,private _router:Router,private router: ActivatedRoute,private toastr:ToastrService, private http: HttpClient) { }

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
    console.log(this.individual )
  }
  else if (this.usertypeid == '4ba19173-94cd-4222-af7c-60c91d446f8e') {
    this.superadmin = true;
  }
  this.fullname = this.companydetails.name;
if(this.fullname != ""){
this.first_name = this.fullname.split(' ')[0];
this.last_name =  this.fullname.split(' ')[1];
}
this.getGlobalBooks()
  this.getBookCategory()
  this.bookid = this.router.snapshot.paramMap.get('id');
  this.buttonname = (this.bookid != null) ? "Update" : "Create";
  if(this.bookid!=undefined && this.bookid!=null && this.bookid!=''){
    this.GetBookById(this.bookid)
    
}
  }
  getGlobalBooks() {
    this.bookService.GetGlobalBook().subscribe(res => {
      this.globalBooks = res
    });
  }
  handleCoverImageInput(files: FileList) {
    
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.bookimage = reader.result; 
    }
}

handleBookInput(files: FileList) { 
  this.UploadBookFile = files.item(0);
}

uploadFileToActivity() {  
  
  if (this.fileToUpload !== null) {
  this.bookService.postFile(this.fileToUpload).subscribe(data => {    
    this.filepathimage= data;
    this.uploadBookFileToActivity()
   console.log(this.filepathimage);
    }, error => {
      console.log(error);
    });
  }
  else {
    this.uploadBookFileToActivity();
  }
}

uploadBookFileToActivity() {
  if (this.UploadBookFile !== null) {
  this.bookService.postBookFile(this.UploadBookFile).subscribe(data => {
    this.bookpathimage = data;
    this.BookModel.coverImageUrl= this.filepathimage;
    if (this.fileToUpload !== null) {
      this.BookModel.coverImageOriginalFileName = this.fileToUpload.name;
    }
    else {
      this.BookModel.coverImageOriginalFileName = "";
    }
    this.BookModel.bookUrl = this.bookpathimage;
    if (this.UploadBookFile !== null){
      this.BookModel.bookOriginalFileName = this.UploadBookFile.name;
    }
    else {
      this.BookModel.bookOriginalFileName = "";
    }
    console.log(this.BookModel)
       this.bookService.Addbook(this.BookModel).subscribe(res=>{
         
         if(res.code==200){
           this.toaster.success(res.message)
           if(this.superadmin){
            this._router.navigateByUrl('/Admin/library')
           }
           else{
            this._router.navigateByUrl('/Main/library')
           }
          }   
          else{
            this.toaster.success(res.message)
          }     
        
       },err=>{
       this.toaster.error("Something went wrong please try again after a moment!")
       });
        
    console.log(this.bookpathimage);
    }, error => {
      console.log(error);
    });
  }
  else {
    this.BookModel.coverImageUrl= this.filepathimage;
    if (this.fileToUpload !== null) {
      this.BookModel.coverImageOriginalFileName = this.fileToUpload.name;
    }
    else {
      this.BookModel.coverImageOriginalFileName = "";
    }
    this.bookService.Addbook(this.BookModel).subscribe(res=>{
      if(res.code==200){
        this.toaster.success(res.message)
        if(this.superadmin){
          this._router.navigateByUrl('/Admin/library')
         }
         else{
          this._router.navigateByUrl('/Main/library')
         }
       }        
     
    },err=>{
    this.toaster.error("Something went wrong please try again after a moment!")
    });
  }
}

  Addbook(form:NgForm){
  debugger;

    this.btnclick=true
    if(form.valid){      
      this.BookModel.companyID=this.companyid 
     this.BookModel.category=this.BookModel.Category
     this.BookModel.userId = this.userid 
     this.BookModel.isIndividual = this.individual
        
     this.uploadFileToActivity();      
    }
    
  }

  getBookCategory(){
    this.bookService.GetBookCategory().subscribe(res=>{
      this.bookcategorylist=res;      
    })
  }

  GetBookById(id){


    this.getbookid= id;
    this.bookService.GetBookById(id).subscribe(res=>{
      
      this.BookModel.companyID=this.companyid
      this.BookModel.Category=res.bookCategoryID
      this.BookModel.Id=this.bookid
      this.BookModel.Title=res.title
      this.BookModel.Author=res.author
      this.BookModel.SubTitle=res.subTitle
      this.BookModel.Publisher=res.publisher
      this.BookModel.Year=res.year
      this.BookModel.CoverImageUrl=res.coverImageUrl
      this.BookModel.parentBookId=res.parentBookID
      if (this.BookModel.TrackCategory!= null) {
        this.BookModel.TrackCategory = res.trackCategory.split('-')[0]
      }
      if(this.BookModel.CoverImageUrl!=null){
        var imageUrl = environment.baseUrl + 'Images/' + res.coverImageUrl;
        this.bookimage = imageUrl;
      }

     
      //this.buttontext='Update'  
    })
  }
  removeimage(){
    this.bookimage = undefined;
    this.BookModel.CoverImageUrl=null
  }
//   MarkBook()
//   {
//     this.MarkBookRead(this.getbookid,this.userid)
 
//   }

//   MarkBookRead(id,userid){

//     this.bookService.MarkBookRead(id,userid,this.userid).subscribe(res=>{

//       if(res.code==200)
//       {
//         this.toastr.success(res.message)
//        // this.getBooks();
//       }
//       if(res.code == 201){
// this.markbookbutton= true;
//         this.toastr.success(res.message)
//       }

//     },err=>{
//       this.toastr.error(err.result.message)
//     })
   
//   }



      
    
//   Save(form:NgForm){
// if(form.valid)
// {

//   this.submitclick=true;
//   this.BookModel
//   this.BookReadModel.companyID=this.companyid;
//   this.BookReadModel.employeeID = this.userid;
//   this.BookReadModel.bookID = this.BookModel.Id;
//   this.BookReadModel.Rating = Number(this.BookReadModel.Rating)

// //   this.bookService.MarkBookRead(this.BookReadModel).subscribe(res=>{

// //     if(res.code==200)
// //     {
// //      // this.toastr.success(res.message)
// //      // this.getBooks();
// //     }
// //     if(res.code == 201){
// // //this.markbookbutton= true;
// //      // this.toastr.success(res.message)
// //     }

// //   },err=>{
// //    // this.toastr.error(err.result.message)
// //   })

// }
  

//   }





}
