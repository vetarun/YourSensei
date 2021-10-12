import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionplanComponent } from './subscriptionplan/subscriptionplan.component';


const routes: Routes = [{path:'',component:SubscriptionplanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionplanRoutingModule { }
