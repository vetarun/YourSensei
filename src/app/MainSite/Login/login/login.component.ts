import { ViewChild } from '@angular/core';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../Shared/Services/authentication.service';

// import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  btnclick: boolean;
  redirectURL: any;
  fieldTextType: boolean = false;
  @ViewChild("template", null) templateRef: TemplateRef<any>;
  constructor(private activatedRoute: ActivatedRoute, private modalService: NgbModal, private SpinnerService: NgxSpinnerService, private auth: AuthenticationService, private route: ActivatedRoute, private _router: Router, private toastr: ToastrService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.redirectURL = params['redirectURL'];
    })
  }

  ngOnInit() {

  }
  formSubmit(form: NgForm) {
    
    this.btnclick = true;
    if (!this.email.invalid && !this.password.invalid) {
      this.SpinnerService.show();
      this.auth.login(this.email, this.password).subscribe(res => {
        this.SpinnerService.hide();
        if (res.code == 200) {
          
          localStorage.setItem('isLoggedin', 'true')
          localStorage.setItem('companyDetails', JSON.stringify(res));
          var timeout = new Date()
          localStorage.setItem('TimeOut', timeout.toString())
          var expirydate = new Date(res.subscriptionExpiryDate)



          if (res.usertypeid != "4ba19173-94cd-4222-af7c-60c91d446f8e") {

            if (expirydate != null) {
              var expiryDateObject = new Date(expirydate.getFullYear(), (expirydate.getMonth()), expirydate.getDate());
              var  currentDateObject = new Date(timeout.getFullYear(), (timeout.getMonth()), timeout.getDate());
              if ((expiryDateObject < currentDateObject) || (expiryDateObject == new Date(1, 0, 1))) {
                if (res.usertypeid == 'fbde320e-6619-4f25-9e7f-2fcc94d2879e' || res.usertypeid == '99f9aeb1-9be6-4e82-8671-ca3df4df16cb') {
                  localStorage.setItem('isExpired', 'true')
                  this.toastr.success('Loggedin Successfully')
                  this._router.navigate(["/Main/subscription"]);
                }
                else {
                  this.toastr.error("Your Company subscription is over. Please contact to your company Admin!")
                }

              }
              else if (this.redirectURL != undefined) {
                this.toastr.success('Loggedin Successfully')
                this._router.navigateByUrl(this.redirectURL);
                this._router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                };
              }
              else {
                this.toastr.success('Loggedin Successfully')
                this._router.navigate(["/Main/dashboard"]);
              }
            }
            else if (this.redirectURL != undefined) {
              this.toastr.success('Loggedin Successfully')
              this._router.navigateByUrl(this.redirectURL);
              this._router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
              };
            }
            else {
              this.toastr.success('Loggedin Successfully')
              this._router.navigate(["/Main/dashboard"]);
            }
          }
          else {
            this.toastr.success('Loggedin Successfully')
            this._router.navigate(["/Admin"]);
          }

         
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
        }
        else {
          this.toastr.error(res.message)
        }
      }, err => {
        this.SpinnerService.hide();
        this.toastr.error(err.message)
      }
      )
    }
  }
  forgotpass() {
    this._router.navigate(["/Main/forgotpassword"]);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
