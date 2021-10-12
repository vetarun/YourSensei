import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalmentorRoutingModule } from './globalmentor-routing.module';
import { GlobalmentorComponent } from './globalmentor/globalmentor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GlobalmentorComponent],
  imports: [
    CommonModule,
    GlobalmentorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GlobalmentorModule { }
