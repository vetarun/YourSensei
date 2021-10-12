import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KaizenBoardRoutingModule } from './kaizen-board-routing.module';
import { KaizenBoardComponent } from './kaizen-board.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../Shared/modules/material.module';


@NgModule({
  declarations: [KaizenBoardComponent],
  imports: [
    CommonModule,
    KaizenBoardRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class KaizenBoardModule { }
