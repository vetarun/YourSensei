import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PowerofsenseiComponent } from './powerofsensei/powerofsensei.component';


const routes: Routes = [{
  path:'',
  component:PowerofsenseiComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerofsenseiRoutingModule { }
