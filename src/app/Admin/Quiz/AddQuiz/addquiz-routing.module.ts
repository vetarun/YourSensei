import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddquizComponent } from './addquiz/addquiz.component';


const routes: Routes = [{
  path:'',
  component:AddquizComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddquizRoutingModule { }
