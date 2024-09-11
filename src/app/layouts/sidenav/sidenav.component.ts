import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { NavItem } from './types';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit{
  @Input() isOpen        : boolean   = true;
  @Input() expandedWidth : string    = '250px';
  @Input() iconSize      : string    = '27px';
  @Input() navItems      : NavItem[] = [];
  @Input() hoverColor    : string    = '#81D0A6';
  @Input() fontColor     : string    = '#FFFFFF';
  @Input() drawerColor   : string    = '#000000';
  @Input() drawerHeight  : string    = '100vh';

  public hoveredNavItem: NavItem | null = null;

  constructor(public sidenavService: SidenavService) {
  }
  
  ngOnInit(){
    this.sidenavService.navItems = this.navItems;
  }
 
  toggleSidenav(): void {
    this.isOpen = !this.isOpen;
  }

  navigateTo(navItem: NavItem): void {
    this.sidenavService.navigateTo(navItem);
  }

  onListItemEnter(navItem: NavItem): void {
    this.hoveredNavItem = navItem;
  }

  onListItemLeave(): void {
    this.hoveredNavItem = null;
  }

  sidenavContentStyle() {
    return {
      'margin-left': this.isOpen
        ? this.expandedWidth
        : `calc(${this.iconSize} + 40px)`,
    };
  }

  drawerContainerStyle() {
    return {
      height: this.drawerHeight,
    };
  }

  drawerStyle() {
    const width = this.isOpen
      ? this.expandedWidth
      : `calc(${this.iconSize} + 40px)`;
    return {
      width: width,
      'background-color': this.drawerColor,
    };
  }

  listStyle() {
    const percentage = ((this.sidenavService.navItems.length) * 9) + '%';
    return {
      height: percentage,
    };
  }

  iconStyle(navItem: NavItem) {
    const backgroundColor =
      navItem === this.sidenavService.selectedNavItem || navItem === this.hoveredNavItem ? this.hoverColor : this.fontColor;

    return {
      'background-color': backgroundColor,
      'mask-image': `url(assets/icons/${navItem.icon})`,
      height: this.iconSize,
      width: this.iconSize,
    };
  }

  labelStyle(navItem: NavItem) {
    const isHighlighted =
    navItem === this.sidenavService.selectedNavItem || navItem === this.hoveredNavItem;

    return {
      color: isHighlighted ? this.hoverColor : this.fontColor,
    };
  }
}