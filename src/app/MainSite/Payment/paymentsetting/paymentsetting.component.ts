import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../../Shared/CommonFunction/common.service';
import $ from 'jquery'
import { AuthenticationService } from '../../../Shared/Services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CardType } from '../../../Shared/Enums/card-type';
import { TextMaskModule } from 'angular2-text-mask';
import { CreditCardValidators, CreditCard } from 'angular-cc-library';




@Component({
  selector: 'app-paymentsetting',
  templateUrl: './paymentsetting.component.html',
  styleUrls: ['./paymentsetting.component.scss']
})
export class PaymentsettingComponent implements OnInit {
  cardname:any
  //public mask = [/[0-1]/, /[0-2]/, '/', /\d/, /\d/]
  buttonname: any = "Add"
  cardModel: any = {}
  today: any
  sixMonthsAgo: any
  companydetails: any = []
  userId: any
  cardId: any
  companyId: any
  cardType: any = CardType
  btnclick: boolean;
  validthrumessage :any;
  validtoday: boolean = false;
  expirymonth: any;
  expiryyear: any;
  years: any[];
  

  constructor(public commonService: CommonService,
    private authenticationService: AuthenticationService,
    private tostr: ToastrService, private router: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.cardModel.validThru = "";
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userId = this.companydetails.userId

    this.companyId = this.companydetails.companyId
    this.cardId = this.router.snapshot.paramMap.get('id');
    this.cardModel.cardType=CardType.Debit
    
    var year = new Date().getFullYear();
    var range = [];
    range.push(year);
    for (var i = 1; i < 10; i++) {
      range.push(year + i);
    }
    this.years = range;
    if (this.cardId != null) {
      
      this.buttonname = "Update"
      this.cardModel.ID = Number(this.cardId)
      this.getCardById()
    } else {
      this.buttonname = "Add"
    }
  }

  Addcard(frm:NgForm){
    
    this.btnclick=true
    if(frm.valid && this.validtoday==false){
      this.cardModel.Id=Number(this.cardId)
      this.cardModel.UserDetailID=this.userId
     // this.cardModel.ValidThru = this.expirymonth + "/" + this.expiryyear
      this.cardModel.IsActive = true
      var compid = this.companyId == "00000000-0000-0000-0000-000000000000" ? "" : this.companyId;
      this.cardModel.CompanyID=compid
      this.authenticationService.AddUpdateCardDetails(this.cardModel).subscribe(res=>{
        
        if(res.code==200){
          this.tostr.success(res.message)
          this._router.navigate(['/Main/card-list']);
        } else {
          this.tostr.error(res.message)
        }
      }, err => {
        this.tostr.error(err.message)
      })
    }
  }
  validatevalidThru(e){
    var todayDate= new Date();
    var value = String.fromCharCode(e.keyCode);
    value = this.cardModel.validThru +''+value
    var currentmonth = Number(todayDate.getMonth()+1);
    var currentyear = Number(todayDate.getFullYear());
    if(value.length > 1){
      var cardmonth = Number(value.split("/")[0]);
      if(value.split("/").length > 1){
        var cardyear = value.split("/")[1];
        cardyear= cardyear != undefined ? cardyear.trim():undefined;
        if(cardyear != undefined && cardyear.length > 3){
          if(cardmonth < currentmonth || cardmonth > 12){
            this.validtoday= true;
          this.validthrumessage = "Invalid month";  
          }
          else if(Number(cardyear) < currentyear){ 
            this.validtoday= true;
             this.validthrumessage = "Invalid year";  
          }
        }
      }
    }
  }

  getCardById() {
    var compid = this.companyId == "00000000-0000-0000-0000-000000000000" ? "" : this.companyId;
    this.authenticationService.GetPaymentCardList(this.cardId, compid, this.userId).subscribe(
      res => {
        console.log(res[0])
        this.cardModel = res[0]
        this.expirymonth = this.cardModel.validThru.split("/")[0]
        this.expiryyear = this.cardModel.validThru.split("/")[1]
        this.getcardtype()
      }
    )
  }

  ChangeCardType(type) {
    this.cardModel.cardType = type
  }

  getcardtype(){
    debugger;
    this.cardname=(<HTMLInputElement>document.getElementById("cardicon")).value
  } 
}

