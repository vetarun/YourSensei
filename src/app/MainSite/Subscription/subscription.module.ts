import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MaterialModule } from '../../Shared/modules/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { YourSenseiModalModule } from '../../Shared/Component/your-sensei-modal/your-sensei-modal.module';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    YourSenseiModalModule,
    NgxPayPalModule
  ],
   exports:[SubscriptionComponent]
})
export class SubscriptionModule { }
