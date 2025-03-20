import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    NavMenuComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    BreadcrumbComponent,
    NavMenuComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()]
})
export class SharedModule { }
