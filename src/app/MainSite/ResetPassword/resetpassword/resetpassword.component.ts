import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../Shared/Services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  link:string=null;
  oldpassword:string=null;
  password:string;
  confirmpassword:string;
  buttonclick:boolean=false
  companydetails: any;
  email: string=null;
  oldPasswordFieldTextType: boolean = false;
  newPasswordFieldTextType: boolean = false;
  confirmPasswordFieldTextType: boolean = false;
  constructor(private modalservice:NgbModal,private toastr:ToastrService,
    private _router: Router,public activatedRoute:ActivatedRoute,
    private auth:AuthenticationService,private spinnerservice:NgxSpinnerService) {  
    activatedRoute.queryParams.subscribe(val => {
      if(val['resetlink'] != undefined){
        this.link =  val['resetlink'];
        
      }
    
   });}

  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    if( this.companydetails != undefined){
      this.email = this.companydetails.email
    }
    if(this.link !=undefined){
      this.varifylink()
    }
   
  }
  varifylink(){
    
    this.auth.ResetPassword(this.link,null,this.email,this.oldpassword).subscribe(res=>{
      
      
      if(res.code==200){
        this.toastr.success(res.message)
      }  else{

        this.toastr.error(res.message) 
        
      }
    },err=>{
      
      this.toastr.error('Some thing went wrong please try after a moment!');
    })
  }
  ResetPassword(){
    
    this.buttonclick=true
    
    if((this.password == this.confirmpassword) && this.password != undefined && this.confirmpassword != undefined){
      if(this.oldpassword == this.password){
this.toastr.error("New Password must be differ from old one")
      }
      else{
        this.spinnerservice.show()
        this.auth.ResetPassword(this.link,this.password,this.email,this.oldpassword).subscribe(res=>{
          this.spinnerservice.hide()
          if(res.code==200){
            this.toastr.success(res.message)
            localStorage.clear();
             this._router.navigate(["/Main/login"]);
          this.modalservice.dismissAll();
            
          }  else{
            this.toastr.error(res.message) 
          }
        },err=>{
          this.spinnerservice.hide()
          this.toastr.error(err.message);
        })
      }
      
    }
  }

  toggleOldPasswordFieldTextType() {
    this.oldPasswordFieldTextType = !this.oldPasswordFieldTextType;
  }

  toggleNewPasswordFieldTextType() {
    this.newPasswordFieldTextType = !this.newPasswordFieldTextType;
  }

  toggleConfirmPasswordFieldTextType() {
    this.confirmPasswordFieldTextType = !this.confirmPasswordFieldTextType;
  }

  backToLogin(){
    localStorage.clear();
    this.modalservice.dismissAll();
    this._router.navigate(["/Main/login"]);
  }
}
