import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanysettingComponent } from './companysetting/companysetting.component';

const routes: Routes = [
  {
    path:'',component:CompanysettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanysettingRoutingModule { }
