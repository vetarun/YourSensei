import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';


const routes: Routes = [{
  path:'',component:CompanyprofileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyprofileRoutingModule { }
