import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionlistComponent } from './subscriptionlist/subscriptionlist.component';


const routes: Routes = [{
  path:'',
  component:SubscriptionlistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionlistRoutingModule { }
