import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionlistRoutingModule } from './subscriptionlist-routing.module';
import { MaterialModule } from '../../Shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { SubscriptionlistComponent } from './subscriptionlist/subscriptionlist.component';


@NgModule({
  declarations: [SubscriptionlistComponent],
  imports: [
    CommonModule,
    SubscriptionlistRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class SubscriptionlistModule { }
