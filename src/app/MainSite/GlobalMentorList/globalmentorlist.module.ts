import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalmentorlistRoutingModule } from './globalmentorlist-routing.module';
import { GlobalmentorlistComponent } from './globalmentorlist/globalmentorlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../Shared/modules/material.module';


@NgModule({
  declarations: [GlobalmentorlistComponent],
  imports: [
    CommonModule,
    GlobalmentorlistRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
    ],
    exports:[
     
    ]
})
export class GlobalmentorlistModule { }
