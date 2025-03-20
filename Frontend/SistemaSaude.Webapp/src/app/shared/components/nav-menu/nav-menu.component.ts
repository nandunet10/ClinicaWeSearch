import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMenuItem } from '../../models/menu.item.model';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menuItems: IMenuItem[] = [
    { text: 'Dashboard', url: '', isOpen: false },
    {
      text: 'Atendimentos', url: '/atendimentos', isOpen: false, subItems: [
        { text: 'Cadastro de Atendimento', url: '/cadastro-atendimento', isOpen: false }
      ]
    },
    {
      text: 'Pacientes', url: '/pacientes', isOpen: false, subItems: [
        { text: 'Cadastro de Paciente', url: '/cadastro-paciente', isOpen: false }
      ]
    }
  ];

  isMenuOpen: boolean = false;

  constructor(private location: Location) { }

  ngOnInit(): void { }

  isActive(url: string, exact: boolean = false): boolean {
    const currentUrl = this.location.path();
    return exact ? currentUrl === url : currentUrl.startsWith(url);
  }

  toggleSubItems(menuItem: IMenuItem): void {
    if (menuItem.subItems) {
      menuItem.isOpen = !menuItem.isOpen;
    }
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}