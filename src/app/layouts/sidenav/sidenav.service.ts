import { Injectable } from '@angular/core';
import { NavItem } from './types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _selectedNavItem!: NavItem;
  private _navItems!       : NavItem[];

  constructor(private router: Router) { 
  }

  public navigateTo(navItem: NavItem): void {
    if (this._selectedNavItem === navItem || !navItem.route) {
      return;
    }

    this.router.navigate([navItem.route]);
    this._selectedNavItem = navItem;
  }

  get selectedNavItem(): NavItem {
    return this._selectedNavItem;
  }

  public set selectedNavItem(navItem: NavItem) {
    this._selectedNavItem = navItem;
  }
  
  public set navItems(navItems: NavItem[]) {
    if (navItems.length > 10) {
      this._navItems = navItems.slice(0, 10); 
      console.warn('NavItems array was too large. Trimming to 10 items.');
    } else {
      this._navItems = navItems;
    }

    this._selectedNavItem = navItems[0];

  }

  public get navItems(): NavItem[]{
    return this._navItems;
  }


}
