import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentortrackcategoryRoutingModule } from './mentortrackcategory-routing.module';
import { MentortrackcategoryComponent } from './mentortrackcategory/mentortrackcategory.component';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { AddstudentsComponent } from './AddStudents/addstudents/addstudents.component';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [MentortrackcategoryComponent],
  imports: [
    CommonModule,
    MentortrackcategoryRoutingModule,
    MaterialModule,
    FormsModule,
    NgxSpinnerModule

  ]
})
export class MentortrackcategoryModule { }
