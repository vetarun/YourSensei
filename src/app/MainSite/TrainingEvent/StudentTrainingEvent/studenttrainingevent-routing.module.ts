import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudenttrainingeventComponent } from './studenttrainingevent/studenttrainingevent.component';


const routes: Routes = [{
  path:'',
  component:StudenttrainingeventComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudenttrainingeventRoutingModule { }
