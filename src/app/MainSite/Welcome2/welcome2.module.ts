import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Welcome2RoutingModule } from './welcome2-routing.module';
import { Welcome2Component } from './welcome2/welcome2.component';


@NgModule({
  declarations: [Welcome2Component],
  imports: [
    CommonModule,
    Welcome2RoutingModule
  ]
})
export class Welcome2Module { }
