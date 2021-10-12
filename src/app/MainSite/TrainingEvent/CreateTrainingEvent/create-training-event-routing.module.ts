import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTrainingEventComponent } from './create-training-event/create-training-event.component';


const routes: Routes = [{
  path:'',
  component:CreateTrainingEventComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTrainingEventRoutingModule { }
