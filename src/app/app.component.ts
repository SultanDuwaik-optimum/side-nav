import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { HeaderComponent } from './layouts/header/header.component';
import { NavItem } from './layouts/sidenav/types';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sidenav';
  isDrawerOpen: boolean = false;

  navItems: NavItem[] = [
    { icon: "dashboard",   label: "Dashboard",       route: 'dashboard',       isSelected: false},
    { icon: "rules",       label: "Rules Engine",    route: 'rules-engine',    isSelected: false},
    { icon: "account",     label: "Accounts",        route: 'accounts',        isSelected: false},
    { icon: "dollar-sign", label: "Billing",         route: 'billing',         isSelected: false},
    { icon: "management",  label: "User Management", route: 'user-management', isSelected: true },
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
  ];

  handleOpenDrawer(event: any){
    this.isDrawerOpen = event;
  }
}
