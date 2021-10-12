import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { HeaderComponent } from './Header/header/header.component';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetpasswordModule } from '../ResetPassword/resetpassword.module';
import { ResetpasswordComponent } from '../ResetPassword/resetpassword/resetpassword.component';
import { AuthGuard } from '../../Shared';
import { YourSenseiModalModule } from '../../Shared/Component/your-sensei-modal/your-sensei-modal.module';
import { YourSenseiModalComponent } from '../../Shared/Component/your-sensei-modal/your-sensei-modal.component';
import { SubscriptionModule } from '../Subscription/subscription.module';
import { SubscriptionComponent } from '../Subscription/subscription/subscription.component';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ResetpasswordModule,
    SubscriptionModule,
    NgbModalModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[ResetpasswordComponent,SubscriptionComponent],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},AuthGuard],
})
export class LayoutModule { }
