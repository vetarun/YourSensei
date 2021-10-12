import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditloghistoryComponent } from './creditloghistory/creditloghistory.component';


const routes: Routes = [
  {
    path:'', component:CreditloghistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditloghistoryRoutingModule { }
