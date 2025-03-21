import { Component } from '@angular/core';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [BreadcrumbComponent, NavMenuComponent, RouterOutlet]
})
export class AppComponent {
  title = 'Sistema de Atendimento';
}
