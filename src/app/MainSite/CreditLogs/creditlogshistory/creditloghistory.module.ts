import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditloghistoryRoutingModule } from './creditloghistory-routing.module';
import { CreditloghistoryComponent } from './creditloghistory/creditloghistory.component';


@NgModule({
  declarations: [CreditloghistoryComponent],
  imports: [
    CommonModule,
    CreditloghistoryRoutingModule
  ]
})
export class CreditloghistoryModule { }
