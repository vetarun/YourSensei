import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../Shared/Services/authentication.service';
import { MentorService } from '../../../Shared/Services/mentor.service';

// import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  companySignup: boolean=false;
  individualSignup: boolean=false;
  CompanyModel:any={}
  IndividualModel:any={}
  ConfirmPassword:any
  path:any
  btnclick: boolean=false;
  AllMentor: any;
  constructor(private spinnerservice: NgxSpinnerService,private auth:AuthenticationService,private _router: Router,private toastr:ToastrService,private mentorService:MentorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    var signupType = this.activatedRoute.snapshot.queryParams['t'];
    if(signupType === "company"){
      this.companysignup();
    }
    else if(signupType === "individual"){
      this.individualsignup();
    }
  }
  companysignup(){
    this.companySignup = true;
  }
  individualsignup(){
    this.individualSignup = true;
    this.getAllMentor();
    
  }
  getAllMentor() {
    this.mentorService.GetAllMentorAnms("00000000-0000-0000-0000-000000000000").subscribe(res => {
      
      this.AllMentor = res;
    });
  }
  signUp(form:NgForm){
    
this.btnclick = true
if(form.valid)
    {
      this.spinnerservice.show()
      this.auth.signUp(this.CompanyModel).subscribe(res=>{
        
          if(res.code==200)
          {
            this.spinnerservice.hide()
            this.toastr.success("Your company has been created successfully!")
            this._router.navigateByUrl('/Main/login');
          }else{
            this.spinnerservice.hide()
            this.toastr.error(res.message)
          }
         
        },err=>{
          this.spinnerservice.hide()
          this.toastr.error("Something went wrong please try again after a moment!")
        }); 
      
      }
       
    
  }
  individualsignupform(form:NgForm){
    
this.btnclick = true
if(this.IndividualModel.password==this.ConfirmPassword && form.valid)
    {
      this.spinnerservice.show()
      this.auth.signUp(this.IndividualModel).subscribe(res=>{
        
        this.spinnerservice.hide()
          if(res.code==200)
          {
            this.toastr.success("Your account has been created successfully!")
            this._router.navigateByUrl('/Main/login');
          }else{
            this.toastr.error(res.message)
          }
         
        },err=>{
          this.spinnerservice.hide()
          this.toastr.error("Something went wrong please try again after a moment!")
        }); 
    }
  }
}
