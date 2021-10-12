import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewinitialassessmentRoutingModule } from './reviewinitialassessment-routing.module';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReviewinitialassessmentComponent } from './reviewinitialassessment/reviewinitialassessment.component';


@NgModule({
  declarations: [ReviewinitialassessmentComponent],
  imports: [
    CommonModule,
    ReviewinitialassessmentRoutingModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule
  ]
})
export class ReviewinitialassessmentModule { }
