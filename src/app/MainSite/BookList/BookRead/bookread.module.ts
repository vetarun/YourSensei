import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookreadRoutingModule } from './bookread-routing.module';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { BookreadComponent } from './bookread/bookread.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BookreadComponent],
  imports: [
    CommonModule,
    BookreadRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class BookreadModule { }
