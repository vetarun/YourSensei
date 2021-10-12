import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalmentorlistComponent } from './externalmentorlist/externalmentorlist.component';


const routes: Routes = [
  {
    path:'',component:ExternalmentorlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalmentorlistRoutingModule { }
