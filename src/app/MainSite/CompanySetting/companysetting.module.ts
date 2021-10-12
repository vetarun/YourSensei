import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { CompanysettingRoutingModule } from './companysetting-routing.module';
import { CompanysettingComponent } from '../CompanySetting/companysetting/companysetting.component';
import { BeltrulesModule } from '../../Admin/BeltRules/beltrules.module';
import { BeltrulesComponent } from '../../Admin/BeltRules/beltrules/beltrules.component';

@NgModule({
  declarations: [CompanysettingComponent],
  imports: [
    CommonModule,
    CompanysettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BeltrulesModule
  ],  
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[BeltrulesComponent]
})
export class CompanysettingModule { }
