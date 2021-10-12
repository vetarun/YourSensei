import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MentorService } from '../../../Shared/Services/mentor.service';


@Component({
  selector: 'app-addmentor',
  templateUrl: './addmentor.component.html',
  styleUrls: ['./addmentor.component.scss']
})
export class AddmentorComponent implements OnInit {
  header: any;
  buttonname: any;
  companydetails: any;
  userid: any;
  companyid: any;
  model: any = {};
  submitclick: boolean = false;
  mentrid;
  disableEmail: boolean = false;
  totalNoOfMentor:number
  constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute, private toaster: ToastrService, private _router: Router, private mentorservice: MentorService) { }

  ngOnInit() {
    
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.companyid = this.companydetails.companyId;
    this.mentrid = this.router.snapshot.paramMap.get('id');
    //this.header = " Mentor";
    //this.buttonname = "Submit";
    this.getMentorlist();
    
    this.header = (this.mentrid != null) ? "Update" : "Add";
    this.buttonname = (this.mentrid != null) ? "Update" : "Submit";
   
    if (this.mentrid != null) {
      this.mentorservice.GetMentorbyid(this.mentrid).subscribe(res => {
        this.model = res;
      })

      this.disableEmail = true;
    }


  }

  SaveMentor(form: NgForm) {

    this.submitclick = true
    if (!form.invalid) {
      this.model.companyId = this.companyid
      this.model.createdBy = this.userid
      this.model.modifiedBy = this.userid
     
      
      if (this.mentrid == null)
      {
        this.mentorservice.AddMentor(this.model).subscribe(res => {
          if (res.code == 200) {
            this.toaster.success(res.message)
            this._router.navigateByUrl('/Main/external-mentorlist')
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
        
        this.model.companyId = this.companyid
        this.model.createdBy = this.userid
        this.model.modifiedBy = this.userid
        this.mentorservice.UpdateMentor(this.model).subscribe(res => {
          if (res.code == 200) {
            this.toaster.success(res.message)
            this._router.navigateByUrl('/Main/external-mentorlist')
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

  getMentorlist(){    
    this.mentorservice.GetAllMentor(this.companyid).subscribe(res => {
      if(this.mentrid==null && res.length>=this.companydetails.numberOfExternalMentors){
        alert("Number of external mentors limit has been exceeded!")
        this._router.navigateByUrl('/Main/external-mentorlist')    
      }
    })
    
  }
}
