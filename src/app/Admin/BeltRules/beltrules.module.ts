import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeltrulesRoutingModule } from './beltrules-routing.module';
import { BeltrulesComponent } from './beltrules/beltrules.component';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BeltrulesComponent],
  imports: [
    CommonModule,
    BeltrulesRoutingModule,
    MaterialModule,
    FormsModule
  ],exports:[BeltrulesComponent]
})
export class BeltrulesModule { }
