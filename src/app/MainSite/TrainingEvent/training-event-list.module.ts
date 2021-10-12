import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingEventListRoutingModule } from './training-event-list-routing.module';
import { TrainingEventListComponent } from '../TrainingEvent/training-event-list/training-event-list.component';
import { MaterialModule } from '../../Shared/modules/material.module';


@NgModule({
  declarations: [TrainingEventListComponent, ],
  imports: [
    CommonModule,
    TrainingEventListRoutingModule,
    FormsModule,
    MaterialModule
  ],
  exports:[],
  
})
export class TrainingEventListModule { }
