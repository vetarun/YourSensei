import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditloglistRoutingModule } from './creditloglist-routing.module';
import { CreditloglistComponent } from './creditloglist/creditloglist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../Shared/modules/material.module';


@NgModule({
  declarations: [CreditloglistComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CreditloglistRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CreditloglistModule { }
