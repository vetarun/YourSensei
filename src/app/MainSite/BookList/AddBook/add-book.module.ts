import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBookRoutingModule } from './add-book-routing.module';
import { AddBookComponent } from '../AddBook/add-book/add-book.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  
  declarations: [AddBookComponent],
  imports: [
    CommonModule,
    AddBookRoutingModule,
    FormsModule,    
    
  ]
})
export class AddBookModule { }
