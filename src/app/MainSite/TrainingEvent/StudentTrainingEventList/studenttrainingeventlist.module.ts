import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudenttrainingeventlistRoutingModule } from './studenttrainingeventlist-routing.module';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { StudenttrainingeventlistComponent } from './studenttrainingeventlist/studenttrainingeventlist.component';


@NgModule({
  declarations: [StudenttrainingeventlistComponent],
  imports: [
    CommonModule,
    StudenttrainingeventlistRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class StudenttrainingeventlistModule { }
