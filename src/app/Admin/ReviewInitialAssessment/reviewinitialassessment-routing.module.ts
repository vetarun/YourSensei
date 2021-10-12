import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewinitialassessmentComponent } from './reviewinitialassessment/reviewinitialassessment.component';


const routes: Routes = [{
  path:'',
  component:ReviewinitialassessmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewinitialassessmentRoutingModule { }
