import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdetialsComponent } from './userdetials/userdetials.component';


const routes: Routes = [
  {
    path:'',
    component:UserdetialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdetailsRoutingModule { }
