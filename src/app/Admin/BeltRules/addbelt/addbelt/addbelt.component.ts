import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../Shared/CommonFunction/common.service';
import { DashboardService } from '../../../../Shared/Services/dashboard.service';

@Component({
  selector: 'app-addbelt',
  templateUrl: './addbelt.component.html',
  styleUrls: ['./addbelt.component.scss']
})
export class AddbeltComponent implements OnInit {
  buttonname:any="Add"
  btnclick:boolean=false
  beltModel:any={}
  companydetails: any;
  usertypeid: any;
  beltid:any
  userId:any
  companyId:any
  superAdminUserType="4BA19173-94CD-4222-AF7C-60C91D446F8E"
  companyAdminUserType="99F9AEB1-9BE6-4E82-8671-CA3DF4DF16CB"
  IndividualUserType="FBDE320E-6619-4F25-9E7F-2FCC94D2879E"
  isIndividual:boolean=false
  backButtonText="Back to Belt List"
  isBeltRulesValidated:boolean=false
  totalBelts
  constructor(private router: ActivatedRoute,private dashboardService:DashboardService,
    private toastr:ToastrService,public commonService:CommonService,private _router:Router) {
     
     }

  ngOnInit() {
    
    
      this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
      this.usertypeid = this.companydetails.usertypeid;
      this.companyId=this.companydetails.companyId
      this.userId=this.companydetails.userId
      this.beltid = this.router.snapshot.paramMap.get('id');
      this.usertypeid.toUpperCase()==this.superAdminUserType?this.backButtonText="Back to Belt List": this.backButtonText="Back to Company Setting"
      if(this.beltid!=null){
        this.buttonname="Update"
        this.beltModel.ID=Number(this.beltid)
        this.getBeltRules()
        
      }else{
        this.getAllBeltRules()
     
        
      
      }
    
    
  }

  AddBelt(frm:NgForm){
    
    this.btnclick=true
    
    this.dashboardService.GetBeltRules(0,this.companyId,this.userId).subscribe(
      res=>{
        this.setRule(res)
        if(frm.valid && this.isBeltRulesValidated==true){
          this.beltModel.CreatedBy=this.userId
          this.beltModel.ModifiedBy=this.userId    
          this.beltModel.IsActive=true
          this.beltModel.UserDetailId=this.userId
          if(this.usertypeid.toUpperCase()==this.companyAdminUserType){
            this.isIndividual=false
            this.beltModel.CompanyID=this.companyId
            this.beltModel.UserDetailID=null
          }else if(this.usertypeid.toUpperCase()==this.IndividualUserType){
            this.isIndividual=true
            this.beltModel.UserDetailID=this.userId
            this.beltModel.CompanyID=null
          }else if(this.usertypeid.toUpperCase()==this.superAdminUserType){
            this.isIndividual=false
            this.beltModel.CompanyID="00000000-0000-0000-0000-000000000000"
            this.beltModel.UserDetailID=null
          }
          
          this.beltModel.isIndividual=this.isIndividual
       
          this.dashboardService.AddUpdateBeltRules(this.beltModel).subscribe
          (res=>{
            if(res.code==200){
              this.toastr.success(res.message)
             this.back()
              
            }else{
              this.toastr.error(res.message)
            }
          },err=>{
            this.toastr.error(err.message)
          })
        } 
      }
      
    )
      
  }

  
  getBeltRules(){
    this.dashboardService.GetBeltRules(this.beltid,this.companyId,this.userId).subscribe(res=>{
      this.beltModel=res[0]
    })

  }



back(){
  this.usertypeid.toUpperCase()==this.superAdminUserType?this._router.navigate(['/Admin/belt-rules']): this._router.navigate(['/Main/companysetting'])
}
  


setRule(res:any){
  if(this.beltid!=null){
    if(res.length>0){
      var nextord=this.getNexOrderValue(res)
      var preord=this.getPreOrderValue(res)
      var nextresult=res.filter(r=>r.orderValue===nextord)
      var preresult=res.filter(r=>r.orderValue===preord)
      if(nextord!=-1){
        if(nextresult[0].totalCredit<this.beltModel.totalCredit){
          alert('Total Credit has been exceed of next belt credits!')
          this.isBeltRulesValidated= false
        }else if(preord!=-1){
          if(preresult[0].totalCredit>this.beltModel.totalCredit){
            alert('Total Credit can not be less then '+preresult[0].totalCredit+' credits!')
            this.isBeltRulesValidated= false
          }else{
            this.isBeltRulesValidated= true
          }          
        }
        else{
          this.isBeltRulesValidated= true
        }
      }else{
        if(res.length>0){
          var result=res.filter(r=>r.orderValue===this.getPreOrderValue(res))
          if(result.length>0){
            if(result[0].totalCredit>this.beltModel.totalCredit){
              alert('Total credit can not less then '+result[0].totalCredit+' credit!')
              this.isBeltRulesValidated= false
            }else{
              this.isBeltRulesValidated= true
            }
          }else{
            this.isBeltRulesValidated= true
          }
          
        }
      }
      
    }
  }else{
    if(res.length>0){
      var result=res.filter(r=>r.orderValue===this.getLastOrderValue(res))
      if(result[0].totalCredit>this.beltModel.totalCredit){
        alert('Total credit can not less then '+result[0].totalCredit+' credit!')
        this.isBeltRulesValidated= false
      }else{
        this.isBeltRulesValidated= true
      }
    }else{
      this.isBeltRulesValidated= true
    }

    
  }
}
getNexOrderValue(res:any):number{
  
  let rtn:number
  let arr:Array<number>=[0]
  var next=res.filter(a=>a.orderValue>this.beltModel.orderValue)
  var lastorder=res[res.length-1].orderValue
  for(var i=0;i<next.length;i++){
    arr[i]=next[i].orderValue
  }
  if(lastorder==this.beltModel.orderValue){
    rtn=-1
  }else{
    rtn=arr.reduce((a, b)=>Math.min(a, b))
  }
  
  return rtn;
}

getLastOrderValue(res:any):number{
  let rtn:number
  let arr:Array<number>=[0]
  for(var i=0;i<res.length;i++){
    arr[i]=res[i].orderValue
  }
  rtn=arr.reduce((a, b)=>Math.max(a, b))
  return rtn;
}

getPreOrderValue(res:any):number{
  
  let rtn:number
  let arr:Array<number>=[0]
  var pre=res.filter(a=>a.orderValue<this.beltModel.orderValue)
  for(var i=0;i<pre.length;i++){
    arr[i]=pre[i].orderValue
  }
  rtn=arr.reduce((a, b)=>Math.max(a, b))
  if(rtn==0){
    rtn=-1
  }
  return rtn;
}

getAllBeltRules() {

  this.dashboardService.GetBeltRules(0, this.companyId, this.userId).subscribe(res => {
    
    this.totalBelts=res.length

  })
}

}
