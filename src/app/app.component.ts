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
    { icon: "dashboard.svg",   label: "Dashboard",       route: 'dashboard',       },
    { icon: "rules.svg",       label: "Rules Engine",    route: 'rules-engine',    },
    { icon: "account.svg",     label: "Accounts",        route: 'accounts',        },
    { icon: "dollar-sign.svg", label: "Billing",         route: 'billing',         },
    { icon: "management.svg",  label: "User Management", route: 'user-management', },
    { icon: "settings.svg",    label: "Settings",        route: 'settings',        },


  ];

  handleOpenDrawer(event: any){
    this.isDrawerOpen = event;
  }
}
