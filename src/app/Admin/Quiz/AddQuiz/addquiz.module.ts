import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddquizRoutingModule } from './addquiz-routing.module';
import { AddquizComponent } from './addquiz/addquiz.component';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [AddquizComponent],
  imports: [
    CommonModule,
    AddquizRoutingModule,
    FormsModule,
    AngularEditorModule
  ],
  exports:[AddquizComponent]
})
export class AddquizModule { }
