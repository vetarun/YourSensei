import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalmentorlistComponent } from './globalmentorlist/globalmentorlist.component';


const routes: Routes = [
  {
    path:'',component:GlobalmentorlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalmentorlistRoutingModule { }
