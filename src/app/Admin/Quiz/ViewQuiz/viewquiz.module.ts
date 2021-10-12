import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewquizRoutingModule } from './viewquiz-routing.module';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { ViewquizComponent } from './viewquiz/viewquiz.component';


@NgModule({
  declarations: [ViewquizComponent],
  imports: [
    CommonModule,
    ViewquizRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ViewquizModule { }
