import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTrainingEventRoutingModule } from './create-training-event-routing.module';
import { CreateTrainingEventComponent } from '../CreateTrainingEvent/create-training-event/create-training-event.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../Shared/modules/material.module';

@NgModule({
  declarations: [CreateTrainingEventComponent],
  imports: [
    CommonModule,
    CreateTrainingEventRoutingModule,
    FormsModule,
    AngularEditorModule,
    NgxSpinnerModule,
    MaterialModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CreateTrainingEventModule { }
