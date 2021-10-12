import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { SubscriptionService } from '../../../Shared/Services/subscription.service';
import { FeaturesAllowed } from "../../../Shared/Enums/SubscriptionPlan";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  modelHeading="Pay and upgrade your plan"
  paymentmode:boolean=false
  Planprice=0
  loggedInUserDetails: any;
  userid: any;
  companyid: any;
  planid: any;
  planName: string = '';
  price: number = 0;
  numberOfDays: number = 0;
  numberOfEmployees: number = 0;
  numberOfExternalMentors: number = 0;
  featuresAllowed: string = '';
  usertypeid: string = '';
  planList: any = [];
  Unlimited: string = 'Unlimited';
  individual: boolean = false;
  subscriptionExpired: boolean = false;
  subscriptionExpirydate: any;
  isChangePlan: boolean = true;
  planID:any; 
  newPlanID:any; 
  newnumberOfDays:any;
  newisChangePlan:any;
  public FeaturesAllowedEnum = FeaturesAllowed;
  fundingSource:any=''
  SubscriptionID:any
  paymentstatus
  TransactionID:any
  IsPmntCmtd:boolean=false
  logoutTime:number
  subscriptionExpiryDate
  leftDaysToExpired
  constructor(private subscriptionService: SubscriptionService, private spinnerservice: NgxSpinnerService, private toaster: ToastrService, private _router: Router) { }

  ngOnInit() {
    this.initConfig()
    this.loggedInUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.loggedInUserDetails.userId;
    this.companyid = this.loggedInUserDetails.companyId
    this.planid = this.loggedInUserDetails.id;
    this.planName = this.loggedInUserDetails.planName;
    this.price = this.loggedInUserDetails.price;
    this.numberOfDays = this.loggedInUserDetails.numberOfDays;
    this.numberOfEmployees = this.loggedInUserDetails.numberOfEmployees;
    this.numberOfExternalMentors = this.loggedInUserDetails.numberOfExternalMentors;
    this.featuresAllowed = this.loggedInUserDetails.finalFeaturesAllowed;
    this.usertypeid = this.loggedInUserDetails.usertypeid
    this.subscriptionExpirydate = this.loggedInUserDetails.subscriptionExpiryDate;
    var date1 = new Date();
    var date2 = new Date(this.subscriptionExpirydate);
    var Time = date2. getTime() - date1. getTime();
    var Days = Time / (1000 * 3600 * 24); //Diference in Days.
    this.leftDaysToExpired=Math.round(Days)-1
    //alert(this.leftDaysToExpired)
    this.subscriptionExpired = localStorage.getItem('isExpired') === 'true' ? true : false;

    if (this.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e') {
      this.individual = true;
      this.featuresAllowed = this.featuresAllowed.replace("External Mentor,", "");
      this.featuresAllowed = this.featuresAllowed.replace("Company Setting,", "");
      this.featuresAllowed = this.featuresAllowed.replace("Company Profile,", "");
      this.featuresAllowed = this.featuresAllowed.replace("Employee,", "");
    }

    this.getPlansList();

  }
  getPlansList() {    
    this.subscriptionService.GetSubscriptionPlans(0).subscribe(res => {
      console.log(res)
      debugger
      if (res != null || res != undefined || res.length > 0) {
        this.planList = res;
        let index = this.planList.findIndex(x => x.isTrialPlan === true);
        this.planList.splice(index, 1)
        let index1 = this.planList.findIndex(x=> x.id===this.planid);
        if(index1!=-1){
          this.planList.splice(index1, 1)
        }
        

      }
    })
  }

  subscribePlan(planID, numberOfDays, isChangePlan,price) {
    this.Planprice=price
    this.paymentmode=true    
    this.newPlanID=planID
    this.newisChangePlan=isChangePlan
    this.newnumberOfDays=numberOfDays
    // if (isChangePlan) {
    //   if (!this.subscriptionExpired) {
    //     if (confirm("Your current plan will get forfeited and new plan will be effective from immediate basis. Are you sure, you want to proceed?")) {
    //       this.changePlan(planID, numberOfDays);
    //     }
    //   }
    //   else {
    //     this.changePlan(planID, numberOfDays);
    //   }
    // }
    // else {
    //   if (!this.subscriptionExpired) {
    //     if (confirm("There will be no change to your current plan and new plan will be effective after the expiry of current plan.")) {
    //       this.subscribe(planID, numberOfDays,false);
    //     }
        
    //   }
    //   else {
    //     alert("You will be logged out from your account after successfull subscription so that new subscription will be effective from immediate basis.")
    //     this.subscribe(planID, numberOfDays,true);
    //   }
    // }
  }

  changePlan(planID, numberOfDays) {
    this.IsPmntCmtd=true
    alert("You will be logged out from your account after successfull subscription so that new subscription will be effective from immediate basis.");
    this.subscribe(planID, numberOfDays, true);
  }

  logout() {
    localStorage.clear();
    this._router.navigate(["/Main/login"]);
  }

  subscribe(planID, numberOfDays, isExpired) {
    var compid = this.companyid == "00000000-0000-0000-0000-000000000000" ? "" : this.companyid;
    this.spinnerservice.show();
    this.subscriptionService.SubscribePlanToUser(this.userid, compid, planID, numberOfDays).subscribe(res => {
      console.log(res)
      if (res.code == 200) {
        this.SubscriptionID=res.subscriptionID
        var transaction:any={}
        transaction.TransactionID=this.TransactionID
        transaction.PlanID=this.newPlanID
        transaction.SubscriptionID=Number(res.subscriptionID)
        transaction.Payment=this.Planprice
        transaction.TransactionDate=new Date()
        transaction.TransactionStatus=this.paymentstatus
        transaction.TransactionMode=this.fundingSource
        transaction.PaymentCardDetailID=0
        this.savePayPalTransaction(transaction)
        this.spinnerservice.hide();
        this.toaster.success(res.message);
        this.modelHeading="PAYMENT "+this.paymentstatus
        
        if (isExpired) {
          this.startTimer()
          setTimeout(() => {            
            this.logout()
          }, 10000);
        }
      }
    }, err => {
      this.spinnerservice.hide();
      this.toaster.error("Something went wrong please try again after a moment!")
    });
  }

  
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AWVOu9a5qcUctEuZGh1KsTBNQBnLbl1XOB_8VsCqrN10IdomSEm5wrrFhm-U0mUlmgQEXaMp4dXh2jGR',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: ''+this.Planprice,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: ''+this.Planprice
                }
              }
            },
            items: [
              {
                name: 'Subscription Plan',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: ''+this.Planprice,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        this.paymentstatus=details.status  
    
        this.paymentstatus=details.status  
        });        
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //debugger 
        var mypurchase_units=[]
        mypurchase_units.push(data.purchase_units[0])
        var pay=[]
        pay.push(mypurchase_units[0].payments)
        var captures=[]
        captures.push(pay[0].captures)
        this.paymentstatus=data.status
        this.modelHeading="PAYMENT "+this.paymentstatus
        var TransactionID:any={}
        TransactionID=captures[0]
        this.TransactionID=TransactionID[0].id
        this.IsPmntCmtd=true
        if (this.newisChangePlan) {
          if (!this.subscriptionExpired) {
            if (confirm("Your current plan will get forfeited and new plan will be effective from immediate basis. Are you sure, you want to proceed?")) {
              this.changePlan(this.newPlanID, this.newnumberOfDays);
            }
          }
          else {
            this.changePlan(this.newPlanID, this.newnumberOfDays);
          }
        }
        else {
          if (!this.subscriptionExpired) {
            if (confirm("There will be no change to your current plan and new plan will be effective after the expiry of current plan.")) {
              this.subscribe(this.newPlanID, this.newnumberOfDays,false);
            }
            
          }
          else {
            alert("You will be logged out from your account after successfull subscription so that new subscription will be effective from immediate basis.")
            this.subscribe(this.newPlanID, this.newnumberOfDays,true);
          }
        }
        
        //console.log(TransactionID[0].id)
      },
      onCancel: (data, actions) => {
        //console.log('OnCancel', data, actions);
      },
      onError: err => {
        //console.log('OnError', err);
      },
      onClick: (data) => {
        //console.log('onClick',data);
        this.fundingSource=data.fundingSource
        this.paymentstatus='INITIALIZED'
        this.modelHeading="PAYMENT "+this.paymentstatus
      },
    };
  }
  messageEvent(val){
    this.paymentmode=val
  }

  savePayPalTransaction(trans){
    this.subscriptionService.SavePayPalTransaction(trans).subscribe(
      res=>{
        this.toaster.success('Transaction completed')
      },err=>{
        this.toaster.error(err.message)
      })
  }

  timeLeft: number = 10;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 10;
      }
    },1000)
  }

  close(e){
    this.IsPmntCmtd=false
    this.messageEvent(false)
  }
}


