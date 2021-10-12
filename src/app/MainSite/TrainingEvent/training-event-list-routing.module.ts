import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingEventListComponent } from './training-event-list/training-event-list.component';


const routes: Routes = [{
  path:'',
  component:TrainingEventListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingEventListRoutingModule { }
