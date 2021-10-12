import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeltrulesComponent } from './beltrules/beltrules.component';


const routes: Routes = [{path:'',component:BeltrulesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeltrulesRoutingModule { }
