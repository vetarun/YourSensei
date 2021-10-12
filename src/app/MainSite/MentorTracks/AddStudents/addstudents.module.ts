import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddstudentsRoutingModule } from './addstudents-routing.module';
import { FormsModule } from '@angular/forms';
import { AddstudentsComponent } from './addstudents/addstudents.component';


@NgModule({
  declarations: [AddstudentsComponent],
  imports: [
    CommonModule,
    AddstudentsRoutingModule,
    FormsModule
  ]
})
export class AddstudentsModule { }
