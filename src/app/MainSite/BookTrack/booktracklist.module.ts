import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooktracklistRoutingModule } from './booktracklist-routing.module';
import { BooktracklistComponent } from './booktracklist/booktracklist.component';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [BooktracklistComponent],
  imports: [
    CommonModule,
    BooktracklistRoutingModule,
    MaterialModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class BooktracklistModule { }
