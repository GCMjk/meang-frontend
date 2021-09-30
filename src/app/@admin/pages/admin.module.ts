import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { TitleComponent } from '@admin-core/components/title/title.component';
import { SidebarComponent } from '@admin-core/components/sidebar/sidebar.component';
import { NavbarComponent } from '@admin-core/components/navbar/navbar.component';


@NgModule({
  declarations: [
    AdminComponent,
    TitleComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
