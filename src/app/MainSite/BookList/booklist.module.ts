import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistRoutingModule } from './booklist-routing.module';
import { BooklistComponent } from './booklist/booklist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../Shared/modules/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BookreadComponent } from './BookRead/bookread/bookread.component';
import { StudentbooklistComponent } from './StudentBookList/studentbooklist/studentbooklist.component';
import { AddquizModule } from '../../Admin/Quiz/AddQuiz/addquiz.module';
import { AddquizComponent } from '../../Admin/Quiz/AddQuiz/addquiz/addquiz.component';
@NgModule({
  declarations: [BooklistComponent],
  imports: [
     CommonModule,
     BooklistRoutingModule,
     FormsModule,
     MaterialModule,
     ReactiveFormsModule,
     NgbModule,
     NgxSpinnerModule,
     AddquizModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  
})
export class BooklistModule { }
