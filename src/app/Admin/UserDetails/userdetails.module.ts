import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserdetailsRoutingModule } from './userdetails-routing.module';
import { MaterialModule } from '../../Shared/modules/material.module';
import { UserdetialsComponent } from './userdetials/userdetials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserdetialsComponent],
  imports: [
    CommonModule,
    UserdetailsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserdetailsModule { }
