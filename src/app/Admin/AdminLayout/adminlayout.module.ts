import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminlayoutRoutingModule } from './adminlayout-routing.module';

import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AdminheaderComponent } from './AdminHeader/adminheader/adminheader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthGuard } from '../../Shared';



@NgModule({
  declarations: [AdminlayoutComponent, AdminheaderComponent,SidebarComponent],
  imports: [
    CommonModule,
    AdminlayoutRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[AuthGuard]
})
export class AdminlayoutModule { }
