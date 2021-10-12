import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Welcome2Component } from './welcome2/welcome2.component';


const routes: Routes = [{
  path:'',
  component:Welcome2Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Welcome2RoutingModule { }
