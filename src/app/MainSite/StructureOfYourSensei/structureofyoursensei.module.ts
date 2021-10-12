import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureofyoursenseiRoutingModule } from './structureofyoursensei-routing.module';
import { StructureofyoursenseiComponent } from './structureofyoursensei/structureofyoursensei.component';


@NgModule({
  declarations: [StructureofyoursenseiComponent],
  imports: [
    CommonModule,
    StructureofyoursenseiRoutingModule
  ]
})
export class StructureofyoursenseiModule { }
