import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddnewsubscriptionplanRoutingModule } from './addnewsubscriptionplan-routing.module';
import { AddnewsubscriptionplanComponent } from './addnewsubscriptionplan/addnewsubscriptionplan.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddnewsubscriptionplanComponent],
  imports: [
    CommonModule,
    AddnewsubscriptionplanRoutingModule,
    FormsModule
  ]
})
export class AddnewsubscriptionplanModule { }
