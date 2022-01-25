import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../Shared/modules/material.module';

import { ResetquizassessmentRoutingModule } from './resetquizassessment-routing.module';
import { ResetquizassessmentComponent } from './resetquizassessment/resetquizassessment.component';



@NgModule({
  declarations: [ResetquizassessmentComponent],
  imports: [
    ResetquizassessmentRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    NgbModule,
    NgxSpinnerModule
  ]
})
export class ResetquizassessmentModule { }
