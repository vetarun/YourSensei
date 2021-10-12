import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentortrackcategoryComponent } from './mentortrackcategory/mentortrackcategory.component';


const routes: Routes = [
  {
    path:'',component:MentortrackcategoryComponent
  }
  ];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentortrackcategoryRoutingModule { }
