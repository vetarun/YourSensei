import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddbeltRoutingModule } from './addbelt-routing.module';
import { AddbeltComponent } from './addbelt/addbelt.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddbeltComponent],
  imports: [
    CommonModule,
    AddbeltRoutingModule,
    FormsModule
  ]
})
export class AddbeltModule { }
