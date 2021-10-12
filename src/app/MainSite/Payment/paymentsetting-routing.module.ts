import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsettingComponent } from './paymentsetting/paymentsetting.component';


const routes: Routes = [{path:'',component:PaymentsettingComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsettingRoutingModule { }
