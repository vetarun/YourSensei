import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewquizComponent } from './viewquiz/viewquiz.component';


const routes: Routes = [{
  path:'',
  component:ViewquizComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewquizRoutingModule { }
