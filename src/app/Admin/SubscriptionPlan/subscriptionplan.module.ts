import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionplanRoutingModule } from './subscriptionplan-routing.module';
import { SubscriptionplanComponent } from './subscriptionplan/subscriptionplan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../Shared/modules/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddquizModule } from '../Quiz/AddQuiz/addquiz.module';



@NgModule({
  declarations: [SubscriptionplanComponent],
  imports: [
    CommonModule,
    SubscriptionplanRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    AddquizModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})

export class SubscriptionplanModule { }
