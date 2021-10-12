import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourSenseiModalRoutingModule } from './your-sensei-modal-routing.module';
import { YourSenseiModalComponent } from './your-sensei-modal.component';


@NgModule({
  declarations: [YourSenseiModalComponent],
  imports: [
    CommonModule,
    YourSenseiModalRoutingModule
  ],
  exports:[YourSenseiModalComponent]
})
export class YourSenseiModalModule { }
