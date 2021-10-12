import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookreadComponent } from './bookread/bookread.component';


const routes: Routes = [{
  path:'',
  component:BookreadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookreadRoutingModule { }
