import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FeaturesAllowed } from "../../../../Shared/Enums/SubscriptionPlan";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Islogedin: boolean = false;
  isopenrightmenu: boolean = false;
  companydetails: any;
  username: any;
  usertypeid;
  showMenu: string;
  superadminview: boolean = false;
  companyuser: boolean = false;
  companyadmin: boolean = false;
  individual: boolean = false;
  mentor: boolean = false;
  isInternalMentor: boolean = false;
  isDollarApprover: boolean = false
  IsSuperAdmin: boolean = false
  isSubscriptionExpire: boolean = false;
  FeaturesAllowedEnum = FeaturesAllowed;
  featureist: any=[];
  trainingformat: any;
  showKaizenlist: boolean = false;
  showA3list: boolean = false;
  constructor(private _router: Router, private router: ActivatedRoute, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    
    this.mentor = false;
    if (localStorage.getItem('isExpired') == 'true') {
      this.isSubscriptionExpire = true;
    }
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    if (this.companydetails != undefined) {
      this.username = this.companydetails.name
      this.Islogedin = true
      this.usertypeid = this.companydetails.usertypeid
      this.isInternalMentor = this.companydetails.isInternalMentor;
      this.isDollarApprover = this.companydetails.isDollarApprover;
      this.router.queryParams.subscribe((params: Params) => {
        if (this.activatedRoute.snapshot.queryParams['eventformat'] != undefined) {
          this.trainingformat = this.activatedRoute.snapshot.queryParams['eventformat'];
        }
      
       })

      
      this.featureist = this.companydetails.featuresAllowedArray
      if (this.usertypeid == '5c37cf64-f617-4399-bb68-645b0c3969a2') {
        this.companyuser = true;
      }
      else if (this.usertypeid == '99f9aeb1-9be6-4e82-8671-ca3df4df16cb') {
        this.companyadmin = true;
      }
      else if (this.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e') {
        this.individual = true;
      }
      else if (this.usertypeid == "c6156716-6d16-4e75-9660-056a59b7b546" || this.usertypeid == "2d2e4aec-d852-417a-8a54-fe80504d83eb") {
        this.mentor = true;
      }
      else if (this.usertypeid.toUpperCase() == '4BA19173-94CD-4222-AF7C-60C91D446F8E') {
        this.IsSuperAdmin = true;
      }
    }


  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  logout() {
    localStorage.clear();
    this.Islogedin = false
    this._router.navigate(["/Main/login"]);
  }
  userprofile() {
    this._router.navigate(["/Main/userprofile"]);
  }
  resetpassword() {
    this._router.navigate(["/Main/resetpassword"]);
  }
  openrightmenu() {
    this.isopenrightmenu = true;
  }
  closerightmenu() {
    this.isopenrightmenu = false;
  }
  login() {
    this._router.navigate(["/Main/login"]);
  }
  signup() {
    this._router.navigate(["/Main/signup"]);
  }


  subscription() {
    this._router.navigate(["/Main/subscription"]);
  }
  getfeaturePermission(feature){
    return this.featureist.includes(this.FeaturesAllowedEnum[feature])
  }
  paymentSetting() {
    this._router.navigate(["/Main/card-list"]);
  }
  companyProfile() {
    this._router.navigate(["/Main/company-profile"]);
  }
}
