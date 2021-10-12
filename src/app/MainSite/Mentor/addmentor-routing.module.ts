import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddmentorComponent } from './addmentor/addmentor.component';


const routes: Routes = [
  {
    path:'',component:AddmentorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmentorRoutingModule { }
