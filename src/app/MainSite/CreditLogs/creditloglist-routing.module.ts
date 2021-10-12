import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditloglistComponent } from './creditloglist/creditloglist.component';


const routes: Routes = [{
  path:'',
  component:CreditloglistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditloglistRoutingModule { }
