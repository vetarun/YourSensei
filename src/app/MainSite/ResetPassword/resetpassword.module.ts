import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent } from '../ResetPassword/resetpassword/resetpassword.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule,
    ResetpasswordRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports:[ResetpasswordComponent]

})
export class ResetpasswordModule { }
