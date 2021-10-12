import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechsupportRoutingModule } from './techsupport-routing.module';
import { TechsupportComponent } from './techsupport/techsupport.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TechsupportComponent],
  imports: [
    CommonModule,
    TechsupportRoutingModule,
    FormsModule
  ]
})
export class TechsupportModule { }
