import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanysettingService } from '../../../../Shared/Services/companysetting.service';
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { MentorService } from '../../../../Shared/Services/mentor.service';



@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {
  userid: any;
  companydetails: any;
  AllRole: any;
  AllMentor: any;
  empid;
  intempid: number;
  header;
  buttonname;
  companyid;
  submitclick: boolean = false;
  model: any = {};
  isMentor:any;
  IsMentorRequired: boolean=false;
  disableEmail: boolean = false;
  showOtherRole: boolean = false;
  totalNoOfEmployee:number
  constructor(private _formBuilder: FormBuilder, private empservice: EmployeeService, private mentorService: MentorService,
    private router: ActivatedRoute, private toaster: ToastrService, private _router: Router, private companysetting: CompanysettingService) { }

  ngOnInit() {
    
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.companyid = this.companydetails.companyId;
    this.empid = this.router.snapshot.paramMap.get('id');
    this.intempid = this.empid;
    this.getemployeelist()
    
    this.empservice.GetAllRole().subscribe(res => {
      this.AllRole = res;
    });
    // this.empservice.GetAllMentor(this.companyid).subscribe(res => {
    //   this.AllMentor = res;
    // });
    this.mentorService.GetMentorsByIsActive(this.companyid, true).subscribe(res => {
      
      this.AllMentor = res;
    });
    //this.GetAllemployeeByCompany();
    this.header = (this.intempid != null) ? "Update Employee" : "Add Employee";
    this.buttonname = (this.intempid != null) ? "Update" : "Submit";

    if (this.intempid != null) {
      this.empservice.GetEmployeebyid(this.intempid).subscribe(res => {
        this.model = res;
        this.roleChange();
      })
      
      this.disableEmail = true;
    }
    this.GetCompanySetting(this.companyid)
  }

  GetCompanySetting(companyid: any) {
    this.companysetting.GetAllCompanySetting(companyid).subscribe(res => { 
      
     // if(res=='True'){
      if(res.isMentorMandatory==true){
this.IsMentorRequired=true
      }
    });
  
  }

  SaveEmployee(form: NgForm) {
    
    this.submitclick = true
    if (!form.invalid) {
      this.model.companyId = this.companyid
      this.model.createdBy = this.userid
      this.model.modifiedBy = this.userid
      //this.model.credit = Number(this.model.credit)
      if (this.intempid == null) {
        this.empservice.AddNewEmployee(this.model).subscribe(res => {
          if (res.code == 200) {
            this.toaster.success(res.message)
            this._router.navigateByUrl('/Main/employee-list')
          } else {
            this.toaster.error(res.message)
          }

        }
          , err => {
            this.toaster.error("Something went wrong please try again after a moment!")
          }
        );
      }
      else {
        this.empservice.UpdateEmployee(this.model).subscribe(res => {
          if (res.code == 200) {
            
            this.toaster.success(res.message)
            this.companydetails.name = this.model.firstName
            this._router.navigateByUrl('/Main/employee-list')
            this._router.routeReuseStrategy.shouldReuseRoute = function () {
              return false;
            };
          } else {
            this.toaster.error(res.message)
          }

        }
          , err => {
            this.toaster.error("Something went wrong please try again after a moment!")
          }
        );
      }
    }
  }

  roleChange(){
    this.showOtherRole = false;
    if(this.model.roleId.toLowerCase() === "d8a61d93-9627-46e3-ac36-f7de0135f8ba"){
      this.showOtherRole = true;
    }
  }

  getemployeelist() {
    this.empservice.GetAllEmployee(this.companyid).subscribe(res => {
      if(this.empid==null && res.length>=this.companydetails.numberOfEmployees){
        alert("Number of employees limit has been exceeded!")
        this._router.navigateByUrl('/Main/employee-list')      
      }
    })
  }
}

