import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface MenuItem {
  label: string;
  url: string;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    { label: 'Atendimentos', url: '/atendimentos' },
    { label: 'Pacientes', url: '/pacientes' },
    { label: 'Cadastro de Paciente', url: '/cadastro-paciente' },
    { label: 'Cadastro de Atendimento', url: '/cadastro-atendimento' },
  ];

  isMenuOpen: boolean = false;

  constructor(private location: Location) { }

  ngOnInit(): void { }

  isActive(url: string, exact: boolean = false): boolean {
    const currentUrl = this.location.path();
    return exact ? currentUrl === url : currentUrl.startsWith(url);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}