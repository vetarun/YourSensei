import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialassessmentRoutingModule } from './initialassessment-routing.module';
import { InitialassessmentComponent } from './initialassessment/initialassessment.component';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InitialassessmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    InitialassessmentRoutingModule,
    MaterialModule
  ],
  exports:[InitialassessmentComponent]
})
export class InitialassessmentModule { }
