import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotpasswordComponent } from '../ForgotPassword/forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [ForgotpasswordComponent],
  imports: [
    CommonModule,
    ForgotpasswordRoutingModule,
    FormsModule
    
  ]
})
export class ForgotpasswordModule { }
