import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddemployeeRoutingModule } from './addemployee-routing.module';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddemployeeComponent],
  imports: [
    CommonModule,
    AddemployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddemployeeModule { }
