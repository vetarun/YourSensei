import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeelistRoutingModule } from './employeelist-routing.module';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeelistComponent],
  imports: [
    CommonModule,
    EmployeelistRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
    ],
    exports:[

    ]
})
export class EmployeelistModule { }
