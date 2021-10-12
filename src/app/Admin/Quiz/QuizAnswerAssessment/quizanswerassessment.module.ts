import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizanswerassessmentRoutingModule } from './quizanswerassessment-routing.module';
import { QuizanswerassessmentComponent } from './quizanswerassessment/quizanswerassessment.component';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [QuizanswerassessmentComponent],
  imports: [
    CommonModule,
    QuizanswerassessmentRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class QuizanswerassessmentModule { }
