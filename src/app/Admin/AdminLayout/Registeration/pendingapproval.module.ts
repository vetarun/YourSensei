import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingapprovalRoutingModule } from './pendingapproval-routing.module';
import { PendingapprovalComponent } from './pendingapproval/pendingapproval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';


@NgModule({
  declarations: [PendingapprovalComponent],
  imports: [
    CommonModule,
    PendingapprovalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,    
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  exports:[
    MatToolbarModule,
  MatGridListModule,
   MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatButtonModule,
  MatSnackBarModule,
  MatIconModule,
  MatTableModule,    
  MatSortModule,
  MatPaginatorModule,
  MatTabsModule
  ]
})
export class PendingapprovalModule { }
