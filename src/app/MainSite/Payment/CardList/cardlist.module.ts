import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardlistRoutingModule } from './cardlist-routing.module';
import { CardlistComponent } from './cardlist/cardlist.component';
import { MaterialModule } from '../../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CardlistComponent],
  imports: [
    CommonModule,
    CardlistRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CardlistModule { }
