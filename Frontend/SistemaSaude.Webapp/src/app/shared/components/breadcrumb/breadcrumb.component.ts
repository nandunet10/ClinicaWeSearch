import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, Route } from "@angular/router";
import { filter } from 'rxjs/operators';

interface IBreadcrumb {
  label: string;
  url: string;
  params?: Params;
  isActive?: Boolean;
  isHome?: Boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root)
    });
  }

  buildBreadCrumb(route: ActivatedRoute, url = '',
    breadcrumbs: Array<IBreadcrumb> = []): Array<IBreadcrumb> {

    // Adicionando verificações de segurança para route.routeConfig
    const routeConfig: Route | null = route.routeConfig;
    const label = routeConfig && routeConfig.data && routeConfig.data['breadcrumb'] ? routeConfig.data['breadcrumb'] : 'Home';
    const path = routeConfig ? routeConfig.path : '';

    let nextUrl = `${url}${path}/`;
    const isHome = !routeConfig;

    const params = Object.keys(route.snapshot.params);
    for (const param of params) {
      nextUrl = nextUrl.replace(':' + param, route.snapshot.params[param])
    }
    const breadcrumb: IBreadcrumb = {
      label: label,
      url: nextUrl,
      isHome: isHome
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];

    // Adicionando verificações de segurança para route.firstChild.routeConfig
    if (route.firstChild && route.firstChild.routeConfig && route.firstChild.routeConfig.path) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    newBreadcrumbs[newBreadcrumbs.length - 1].isActive = true;
    return newBreadcrumbs.filter(p => p.label);
  }
}