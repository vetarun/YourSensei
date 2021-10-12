import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsettingRoutingModule } from './paymentsetting-routing.module';
import { PaymentsettingComponent } from './paymentsetting/paymentsetting.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../Shared/modules/material.module';
import { TextMaskModule } from 'angular2-text-mask';
import { CreditCardDirectivesModule } from 'angular-cc-library';


@NgModule({
  declarations: [PaymentsettingComponent],
  imports: [
    CommonModule,
    PaymentsettingRoutingModule,
    FormsModule,
    MaterialModule,

    TextMaskModule,
    CreditCardDirectivesModule

  ],
})
export class PaymentsettingModule { }
