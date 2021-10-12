import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../Shared/Services/employee.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  userdetails: any;
  Model: any={};
  mentor: boolean = false;
  usertypeid: any;

  constructor(private employeeService:EmployeeService,private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    
      this.userdetails = JSON.parse(localStorage.getItem("companyDetails"));
      this.usertypeid = this.userdetails.usertypeid;
      this.mentor = false;
      if(this.usertypeid == "c6156716-6d16-4e75-9660-056a59b7b546" || this.usertypeid == "2d2e4aec-d852-417a-8a54-fe80504d83eb"){
        this.mentor = true;
      }
      this.getProfile()
  }
  getProfile()
  {     

   // this.companydetails.email
   if(this.mentor){
    this.employeeService.GetMentorProfileByEmail(this.userdetails.email).subscribe(res=>{
      this.Model=res;
      })
   }
   else{
    this.employeeService.GetProfileByEmail(this.userdetails.email).subscribe(res=>{
    this.Model=res;
    })
  }
  }
}
