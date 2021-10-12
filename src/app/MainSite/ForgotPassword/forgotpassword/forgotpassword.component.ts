import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../Shared/Services/authentication.service';

// import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  email:any;
  isloggedin:boolean=false;
  btnclick: boolean;
  constructor(private auth:AuthenticationService,private toastr:ToastrService) { }

  ngOnInit() {
  }
  ForgotPassword(form:NgForm){
    this.btnclick=true;
    if(form.valid){
      this.auth.ForgotPassword(this.email).subscribe(res=>{
        
        if(res.code==200){
          this.toastr.success(res.message)
        }else
        {
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err.message)
      })
    }
    
  }

}
