import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnewsubscriptionplanComponent } from './addnewsubscriptionplan/addnewsubscriptionplan.component';


const routes: Routes = [{path:'',component:AddnewsubscriptionplanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddnewsubscriptionplanRoutingModule { }
