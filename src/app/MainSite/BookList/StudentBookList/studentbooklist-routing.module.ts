import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentbooklistComponent } from './studentbooklist/studentbooklist.component';


const routes: Routes = [{
  path:'',
  component:StudentbooklistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentbooklistRoutingModule { }
