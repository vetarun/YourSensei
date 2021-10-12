import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudenttrainingeventRoutingModule } from './studenttrainingevent-routing.module';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { StudenttrainingeventComponent } from './studenttrainingevent/studenttrainingevent.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [StudenttrainingeventComponent],
  imports: [
    CommonModule,
    StudenttrainingeventRoutingModule,
    MaterialModule,
    FormsModule,
    NgbModalModule,
    NgxSpinnerModule
  ]
})
export class StudenttrainingeventModule { }
