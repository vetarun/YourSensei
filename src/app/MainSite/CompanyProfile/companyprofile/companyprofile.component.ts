import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyDetailService } from '../../../Shared/Services/companydetail.service';


@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyprofileComponent implements OnInit {
  userid;
  userRole;
  companyid;
  companydetails;
  email:any
  CompanyModel:any={}
    constructor(private companyDetailService:CompanyDetailService,private toastr: ToastrService,private router: Router) { }
  
    ngOnInit() {
      
      this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
      this.userid = this.companydetails.userId;
      this.userRole = this.companydetails.roles;
      this.companyid = this.companydetails.companyId

      this.getProfile()
      // if(this.userRole !='1' && this.userRole !='2')
      // {
      //   this.router.navigateByUrl('')
      // }
      // if(localStorage.getItem('roles')!='1' && localStorage.getItem('roles')!='2')
      // {
      //   this.router.navigateByUrl('')
      // }
    }
  
    getProfile()
    {     

     // this.companydetails.email
      this.companyDetailService.GetProfileByID(this.companyid).subscribe(res=>{
      this.CompanyModel=res;
      console.log(res)
      })
    }
  }
  