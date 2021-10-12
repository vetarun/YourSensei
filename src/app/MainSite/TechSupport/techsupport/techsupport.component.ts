import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../Shared/Services/authentication.service';

@Component({
  selector: 'app-techsupport',
  templateUrl: './techsupport.component.html',
  styleUrls: ['./techsupport.component.scss']
})
export class TechsupportComponent implements OnInit {
  model: any = {}
  submitclick: boolean = false;
  constructor(private authService: AuthenticationService, private toast: ToastrService) { }

  ngOnInit() {
  }
  SendDetails(form: NgForm) {
    this.submitclick = true;
    if (!form.invalid) {
      this.authService.SendSupport(this.model).subscribe(res => {
        if (res.code == 200) {
          this.toast.success("Your Detail is Submotted")
          location.reload()
        }
      })
    }
  }
}
