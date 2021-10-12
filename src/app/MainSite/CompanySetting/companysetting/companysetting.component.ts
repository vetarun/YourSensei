import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Companysetting } from '../../../Models/CompanySetting/companysetting';
import { CompanysettingService } from '../../../Shared/Services/companysetting.service';
import { EmployeeService } from '../../../Shared/Services/employee.service';

// import { Companysetting } from 'src/app/Models/CompanySetting/companysetting';
// import { CompanysettingService } from 'src/app/Shared/Services/companysetting.service';

@Component({
  selector: 'app-companysetting',
  templateUrl: './companysetting.component.html',
  styleUrls: ['./companysetting.component.scss']
})
export class CompanysettingComponent implements OnInit {
  userid;
  userRole;
  companydetails: any;
  CompanysettingForm:FormGroup;
  customsettingbyid;
  companyid;
  objcmpny = new Companysetting();
  empList: any[];
  constructor(private empservice:EmployeeService,private _formBuilder: FormBuilder,private objservice : CompanysettingService,private toaster: ToastrService) { }
  ngOnInit() {
    
    this.AddcompanysettingForm();
   
   this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
   this.userid = this.companydetails.userId;
   this.userRole = this.companydetails.roles;
   this.companyid = this.companydetails.companyId
    
    this.BindCompanysettings();
    this.GetEmployee();

  }

  BindCompanysettings(){
    this.objservice.GetCompanySettingbyId(this.companyid).subscribe(res => {
      this.customsettingbyid = res;
      
      this.CompanysettingForm.controls["impactapprover"].setValue(res.a3DollarApprover);
      if (res.isMentorMandatory == true) {
       this.CompanysettingForm.controls["ismentor"].setValue("Yes");
     }
     else {
       this.CompanysettingForm.controls["ismentor"].setValue("No");
     }

     if (res.globalAverageBookRating == true) {
       this.CompanysettingForm.controls["isaveragebookrating"].setValue("Yes");
     }
     else {
       this.CompanysettingForm.controls["isaveragebookrating"].setValue("No");
     }
     if (res.globalBookList == true) {
       this.CompanysettingForm.controls["isglobalbookupdate"].setValue("Yes");
     }
     else {
       this.CompanysettingForm.controls["isglobalbookupdate"].setValue("No");
     }
     if (res.globalMentor == true) {
       this.CompanysettingForm.controls["isglobalmentor"].setValue("Yes");
     }
     else {
       this.CompanysettingForm.controls["isglobalmentor"].setValue("No");
     }
      console.log(this.customsettingbyid);
  });
  }
  GetEmployee() {

    this.empservice.GetAllEmployee(this.companyid).subscribe(res => {
      
      this.empList = []
      this.empList = res;
      

      
    })

  }
  AddcompanysettingForm(): void {
    this.CompanysettingForm = this._formBuilder.group({  
      companyid: new FormControl(''),
      ismentor: new FormControl(''),
      isaveragebookrating: new FormControl(''),
      isglobalmentor: new FormControl(''),
      isglobalbookupdate: new FormControl(''),      
      createdby: new FormControl(''),
      createddate: new FormControl(''),
      modifiedby: new FormControl(''),
      modifieddate: new FormControl(''),
      impactapprover: new FormControl(''),
    });
  }

  formSubmit()
  {
    
    this.CompanysettingForm.value;
    if(this.CompanysettingForm.valid)
    {
      
      this.objcmpny.IsMentorMandatory = (this.CompanysettingForm.controls["ismentor"].value == "No") ? false : true; 
      this.objcmpny.GlobalAverageBookRating = (this.CompanysettingForm.controls["isaveragebookrating"].value == "No") ? false : true; 
      this.objcmpny.GlobalBookList = (this.CompanysettingForm.controls["isglobalbookupdate"].value == "No") ? false : true; 
      this.objcmpny.GlobalMentor = (this.CompanysettingForm.controls["isglobalmentor"].value == "No") ? false : true;    
      this.objcmpny.CompanyId = this.companyid;
      this.objcmpny.CreatedBy = this.userid;
      this.objcmpny.ModifiedBy = this.userid; 
      this.objcmpny.A3DollarApprover = this.CompanysettingForm.controls["impactapprover"].value
      this.objservice.AddCompanySetting(this.objcmpny).subscribe(res => {
             this.toaster.success("Your Company setting has been Added successfully!")
      }
        , err => {
          this.toaster.error("Something went wrong please try again after a moment!")
        }
      );
    }
    else{
      this.toaster.error("Select yes/no for Is Mentor Mandatory field!")
    }
    // if(this.CompanysettingForm.controls["ismentor"].value != "")
    // {
    //   this.objcmpny.IsMentorMandatory = (this.CompanysettingForm.controls["ismentor"].value == "No") ? false : true; 
    //   this.objcmpny.IsAverageBookRating = (this.CompanysettingForm.controls["isaveragebookrating"].value == "No") ? false : true; 
    //   this.objcmpny.IsGlobalBookUpdate = (this.CompanysettingForm.controls["isglobalbookupdate"].value == "No") ? false : true; 
    //   this.objcmpny.IsGlobalMentor = (this.CompanysettingForm.controls["isglobalmentor"].value == "No") ? false : true;    
    //   this.objcmpny.CompanyId = this.companyid;
    //   this.objcmpny.CreatedBy = this.userid;
    //   this.objcmpny.ModifiedBy = this.userid;      
    //   this.objservice.AddCompanySetting(this.objcmpny).subscribe(res => {
    //          this.toaster.success("Your Company setting has been Added successfully!")
    //   }
    //     , err => {
    //       this.toaster.error("Something went wrong please try again after a moment!")
    //     }
    //   );
    // }
    // else{
    //   this.toaster.error("Select yes/no for Is Mentor Mandatory field!")
    // }
 
   }


}