import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { A3TrainingEventListComponent } from './a3-training-event-list.component';


const routes: Routes = [{path:'',component:A3TrainingEventListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class A3TrainingEventListRoutingModule { }
