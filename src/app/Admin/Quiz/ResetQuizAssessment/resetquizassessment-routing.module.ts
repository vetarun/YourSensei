import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetquizassessmentComponent } from './resetquizassessment/resetquizassessment.component';


const routes: Routes = [{
  path:'',
  component:ResetquizassessmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetquizassessmentRoutingModule { }
