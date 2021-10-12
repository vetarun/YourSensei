import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizlistRoutingModule } from './quizlist-routing.module';
import { QuizlistComponent } from './quizlist/quizlist.component';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [QuizlistComponent],
  imports: [
    CommonModule,
    QuizlistRoutingModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule
  ]
})
export class QuizlistModule { }
