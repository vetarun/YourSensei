import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyprofileRoutingModule } from './companyprofile-routing.module';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';


@NgModule({
  declarations: [CompanyprofileComponent],
  imports: [
    CommonModule,
    CompanyprofileRoutingModule
  ]
})
export class CompanyprofileModule { }
