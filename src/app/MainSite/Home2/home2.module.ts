import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home2RoutingModule } from './home2-routing.module';
import { Home2Component } from './home2/home2.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InitialassessmentModule } from '../InitialAssessment/initialassessment.module';
@NgModule({
  declarations: [Home2Component],
  imports: [
    CommonModule,
    Home2RoutingModule,
    NgbModule,
    InitialassessmentModule
  ]
})
export class Home2Module { }
