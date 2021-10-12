import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizanswerassessmentComponent } from './quizanswerassessment/quizanswerassessment.component';


const routes: Routes = [{
  path:'',
  component:QuizanswerassessmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizanswerassessmentRoutingModule { }
