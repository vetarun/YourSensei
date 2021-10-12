import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'Admin', loadChildren: () => import('../app/Admin/AdminLayout/adminlayout.module').then(m => m.AdminlayoutModule), },
  { path: 'Main', loadChildren: () => import('../app/MainSite/Layout/layout.module').then(m => m.LayoutModule) },
  {path:'',loadChildren:() => import('../app/MainSite/Welcome/welcome.module').then(m => m.WelcomeModule)},
  {path:'welcome2',loadChildren:() => import('../app/MainSite/Welcome2/welcome2.module').then(m => m.Welcome2Module)},
 
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
