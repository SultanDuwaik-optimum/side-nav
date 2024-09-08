import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NavItem{
  icon: string;
  label: string;
  route?:string;
  isSelected?:boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})

export class SidenavComponent {

  @Input() isSideNavOpen!: boolean;

  navItems: NavItem[] = [
    { icon: "dashboard",   label: "Dashboard",       route: 'dashboard',       isSelected: false},
    { icon: "rules",       label: "Rules Engine",    route: 'rules-engine',    isSelected: false},
    { icon: "account",     label: "Accounts",        route: 'accounts',        isSelected: false},
    { icon: "dollar-sign", label: "Billing",         route: 'billing',         isSelected: false},
    { icon: "management",  label: "User Management", route: 'user-management', isSelected: true },
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false},
    { icon: "settings",    label: "Settings",        route: 'settings',        isSelected: false}
  ];

  constructor(private router: Router){}

  toggleSidenav(): void {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  getSidenavContentStyle(){
    return {
      'margin-left': this.isSideNavOpen ? '215px' : '65px',
    };
  }

  navigateToRoute(navItem: NavItem) : void{
    if(navItem.isSelected == true){
      return;
    }

    for (let item of this.navItems) {      
      if(item.isSelected){
        item.isSelected = false;
        break;
      }
    }

    navItem.isSelected = true;
    this.router.navigate([navItem.route]);
  }
  
}
