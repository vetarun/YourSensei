import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MentorService } from '../../../Shared/Services/mentor.service';


@Component({
  selector: 'app-globalmentor',
  templateUrl: './globalmentor.component.html',
  styleUrls: ['./globalmentor.component.scss']
})
export class GlobalmentorComponent implements OnInit {

  header: any;
  buttonname: any;
  companydetails: any;
  userid: any;
  companyid: any;
  model: any = {};
  submitclick: boolean = false;
  mentrid;
  disableEmail: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute, private toaster: ToastrService, private _router: Router, private mentorservice: MentorService) { }

  ngOnInit() {
    
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.companyid = this.companydetails.companyId;
    this.mentrid = this.router.snapshot.paramMap.get('id');
    // this.header = "Add Mentor";
    // this.buttonname = "Submit";
    this.header = (this.mentrid != null) ? "Update" : "Add";
    this.buttonname = (this.mentrid != null) ? "Update" : "Submit";    
    if (this.mentrid != null) {
      this.mentorservice.GetMentorbyid(this.mentrid).subscribe(res => {
        this.model = res;
      })

      this.disableEmail = true;
    }
  }

  SaveGlobalMentor(form: NgForm) {

    this.submitclick = true
    if (!form.invalid) {
      this.model.companyId = '00000000-0000-0000-0000-000000000000'
      this.model.createdBy = this.userid
      this.model.modifiedBy = this.userid
      if (this.mentrid == null) {
      this.mentorservice.AddMentor(this.model).subscribe(res => {
        if (res.code == 200) {
          this.toaster.success(res.message)
          this._router.navigateByUrl('/Admin/global-mentorlist')

        } else {
          this.toaster.error(res.message)
        }

      }
        , err => {
          this.toaster.error("Something went wrong please try again after a moment!")
        }
      );
    }
    else
    {
      
      this.model.companyId = '00000000-0000-0000-0000-000000000000'
      this.model.createdBy = this.userid
      this.model.modifiedBy = this.userid
      this.mentorservice.UpdateMentor(this.model).subscribe(res => {
        if (res.code == 200) {
          this.toaster.success(res.message)
          this._router.navigateByUrl('/Admin/global-mentorlist')
        } else {
          this.toaster.error(res.message)
        }

      }
        , err => {
          this.toaster.error("Something went wrong please try again after a moment!")
        }
      )
    }

  }
   

  }

}
