import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KaizenBoardComponent } from './kaizen-board.component';


const routes: Routes = [{path:'',component:KaizenBoardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaizenBoardRoutingModule { }
