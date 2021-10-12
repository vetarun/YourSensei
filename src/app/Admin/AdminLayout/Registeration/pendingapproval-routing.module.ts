import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingapprovalComponent } from './pendingapproval/pendingapproval.component';


const routes: Routes = [
  {
    path:'',component:PendingapprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingapprovalRoutingModule { }
