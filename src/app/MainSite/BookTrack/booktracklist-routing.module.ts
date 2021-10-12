import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooklistComponent } from '../BookList/booklist/booklist.component';
import { BooktracklistComponent } from './booktracklist/booktracklist.component';


const routes: Routes = [{
  path:'',
  component:BooktracklistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooktracklistRoutingModule { }
