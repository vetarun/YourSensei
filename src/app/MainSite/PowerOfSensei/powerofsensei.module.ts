import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerofsenseiRoutingModule } from './powerofsensei-routing.module';
import { PowerofsenseiComponent } from './powerofsensei/powerofsensei.component';


@NgModule({
  declarations: [PowerofsenseiComponent],
  imports: [
    CommonModule,
    PowerofsenseiRoutingModule
  ]
})
export class PowerofsenseiModule { }
