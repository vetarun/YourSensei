import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbeltComponent } from './addbelt/addbelt.component';


const routes: Routes = [{path:'',component:AddbeltComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddbeltRoutingModule { }
