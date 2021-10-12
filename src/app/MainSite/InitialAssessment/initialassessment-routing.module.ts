import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialassessmentComponent } from './initialassessment/initialassessment.component';


const routes: Routes = [{
  path:'',
  component:InitialassessmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialassessmentRoutingModule { }
