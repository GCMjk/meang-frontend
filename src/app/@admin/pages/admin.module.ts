import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TitleComponent } from '../core/components/title/title.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';


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
