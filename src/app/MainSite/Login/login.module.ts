import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from "./login/login.component";
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetpasswordModule } from '../ResetPassword/resetpassword.module';
import { YourSenseiModalModule } from '../../Shared/Component/your-sensei-modal/your-sensei-modal.module';
import { YourSenseiModalComponent } from '../../Shared/Component/your-sensei-modal/your-sensei-modal.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgbModule,
    ResetpasswordModule,
    YourSenseiModalModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents:[YourSenseiModalComponent]
})
export class LoginModule { }
