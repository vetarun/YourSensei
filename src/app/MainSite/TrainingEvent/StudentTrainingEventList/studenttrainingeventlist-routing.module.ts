import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudenttrainingeventlistComponent } from './studenttrainingeventlist/studenttrainingeventlist.component';


const routes: Routes = [{
  path:'',
  component:StudenttrainingeventlistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudenttrainingeventlistRoutingModule { }
