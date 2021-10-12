import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentbooklistRoutingModule } from './studentbooklist-routing.module';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { StudentbooklistComponent } from './studentbooklist/studentbooklist.component';


@NgModule({
  declarations: [StudentbooklistComponent],
  imports: [
    CommonModule,
    StudentbooklistRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class StudentbooklistModule { }
