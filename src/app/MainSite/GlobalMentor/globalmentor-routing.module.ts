import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalmentorComponent } from './globalmentor/globalmentor.component';


const routes: Routes = [{
  path:'',
  component:GlobalmentorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalmentorRoutingModule { }
