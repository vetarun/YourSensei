import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizlistComponent } from './quizlist/quizlist.component';


const routes: Routes = [{
  path:'',
  component:QuizlistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizlistRoutingModule { }
