import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalmentorlistRoutingModule } from './externalmentorlist-routing.module';
import { ExternalmentorlistComponent } from './externalmentorlist/externalmentorlist.component';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExternalmentorlistComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ExternalmentorlistRoutingModule,
    MaterialModule
    ],
    exports:[
     
    
    ]
  
})
export class ExternalmentorlistModule { }
