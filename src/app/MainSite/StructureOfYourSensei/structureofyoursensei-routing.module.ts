import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructureofyoursenseiComponent } from './structureofyoursensei/structureofyoursensei.component';


const routes: Routes = [{
  path:'',
  component:StructureofyoursenseiComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureofyoursenseiRoutingModule { }
