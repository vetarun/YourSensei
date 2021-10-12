import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmentorRoutingModule } from './addmentor-routing.module';
import { AddmentorComponent } from './addmentor/addmentor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddmentorComponent],
  imports: [
    CommonModule,
    AddmentorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddmentorModule { }
