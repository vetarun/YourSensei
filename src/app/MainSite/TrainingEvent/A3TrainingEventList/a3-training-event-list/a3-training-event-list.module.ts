import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { A3TrainingEventListRoutingModule } from './a3-training-event-list-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { A3TrainingEventListComponent } from './a3-training-event-list.component';


@NgModule({
  declarations: [A3TrainingEventListComponent],
  imports: [
    CommonModule,
    A3TrainingEventListRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class A3TrainingEventListModule { }
