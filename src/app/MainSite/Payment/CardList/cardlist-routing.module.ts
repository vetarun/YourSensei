import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardlistComponent } from './cardlist/cardlist.component';


const routes: Routes = [{path:'',component:CardlistComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardlistRoutingModule { }
