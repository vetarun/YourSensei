import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechsupportComponent } from './techsupport/techsupport.component';


const routes: Routes = [{
  path:'',
  component:TechsupportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechsupportRoutingModule { }
