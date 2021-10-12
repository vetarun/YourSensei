import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../Shared/CommonFunction/common.service';
import { SubscriptionService } from '../../../../Shared/Services/subscription.service';

@Component({
  selector: 'app-addnewsubscriptionplan',
  templateUrl: './addnewsubscriptionplan.component.html',
  styleUrls: ['./addnewsubscriptionplan.component.scss']
})
export class AddnewsubscriptionplanComponent implements OnInit {
  buttonname:any="Add"
  btnclick:boolean=false
  planModel:any={}
  companydetails: any;
  usertypeid: any;
  planid:any
  isTrailPlan:boolean
  userId:any
  featuresAllowed:any=[]
  ult:any={}
  constructor(private router: ActivatedRoute,private subscriptionService:SubscriptionService,
    private toastr:ToastrService,public commonService:CommonService,private _router:Router) {
      this.ult.days=false
      this.ult.mentor=false
      this.ult.employee=false
      this.planModel.numberOfExternalMentors=0
      this.planModel.numberOfEmployees=0
      this.planModel.numberOfDays=0
     }

  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.usertypeid = this.companydetails.usertypeid;
    this.userId=this.companydetails.userId
    this.planid = this.router.snapshot.paramMap.get('id');
    this.planModel.featuresAllowed=','
    
    if(this.planid!=null){
      this.buttonname="Update"
      this.planModel.ID=Number(this.planid)
      this.getSubscriptionPlans()
    }else{
      this.buttonname="Add"
      this.planModel.isTrialPlan=false
      this.planModel.ID=0
      this.GetFeaturesAllowed(null)
    }
    
  }

  Addplan(frm:NgForm){
    
    this.btnclick=true
    if(frm.valid && this.planModel.featuresAllowed!=','){
      this.planModel.CreatedBy=this.userId
      this.planModel.ModifiedBy=this.userId    
      this.planModel.FeaturesAllowedArray=['']
      this.planModel.IsActive=true
      this.subscriptionService.AddUpdateSubscriptionPlans(this.planModel).subscribe
      (res=>{
        if(res.code==200){
          this.toastr.success(res.message)
          this._router.navigate(['/Admin/subscription-plan'])
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err.message)
      })
    }    
  }

  
  getSubscriptionPlans(){
    this.subscriptionService.GetSubscriptionPlans(this.planid).subscribe(
      res=>this.GetFeaturesAllowed(res))
  }

  GetFeaturesAllowed(res){
    if(res!=null){
      this.planModel=res[0];
    }
    this.subscriptionService.GetFeaturesAllowed().subscribe(
      res =>this.manipulateAllowedFeatures(res))
  }
  manipulateAllowedFeatures(res){
    console.log(this.planModel)
    if(this.planid!=null && this.planModel.isTrialPlan){
      this.isTrailPlan=false
    }else{
      this.isTrailPlan=res.isTrailPlanAlreadyExist
    }
    
    res=res.featuresAllowed
    if(this.planModel.featuresAllowedArray){
      for(var i=0;i<res.length;i++){
        if(this.planModel.featuresAllowedArray.indexOf(res[i].key)!=-1){
          this.featuresAllowed.push({
            key:res[i].key,
            value:res[i].value,
            isSelect:true
          })
        }else{
          this.featuresAllowed.push({
            key:res[i].key,
            value:res[i].value,
            isSelect:false
          })
        }
      }
    }else{
      this.featuresAllowed=res
    }
    
  }
  ChooseFeatureAllowed(e,val){
    if(e.target.checked){
      if(!this.planModel.featuresAllowed.includes(val))
      this.planModel.featuresAllowed=this.planModel.featuresAllowed+val+','
    }else{
      this.planModel.featuresAllowed=this.planModel.featuresAllowed.replace(','+val,'')
    }
  }

  makePlanUnlimited(e,field){
    if(field=='day'){
      this.ult.days=e.target.checked
      e.target.checked==true?this.planModel.numberOfDays=1825:this.planModel.numberOfDays=0
    }else if(field=='mentor'){
      this.ult.mentor=e.target.checked
      e.target.checked==true?this.planModel.numberOfExternalMentors=1000:this.planModel.numberOfExternalMentors=0
    }else if(field=='employee'){
      this.ult.employee=e.target.checked
      e.target.checked==true?this.planModel.numberOfEmployees=10000:this.planModel.numberOfEmployees=0
    }
  }
}
