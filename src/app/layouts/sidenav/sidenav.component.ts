import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule }  from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule }     from '@angular/common';
import { Router }           from '@angular/router';
import { NavItem }          from './types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})

export class SidenavComponent{

  @Input() isOpen!       : boolean;
  @Input() expandedWidth : string = "250px";
  @Input() iconSize      : string = "27px";
  @Input() navItems      : NavItem[] = [];
  @Input() hoverColor    : string = "#81D0A6";
  @Input() fontColor     : string = "#FFFFFF";
  @Input() drawerColor   : string = '#000000';
  @Input() drawerHeight  : string = '100vh';

  public hoveredIndex: number | null = null;

  constructor(private router: Router){}


  toggleSidenav(): void {
    this.isOpen = !this.isOpen;
  }

  navigateTo(navItem: NavItem): void {
    if (navItem.isSelected || !navItem.route) {
      return;
    }
  
    this.navItems.forEach(item => item.isSelected = false);
  
    navItem.isSelected = true;
  
    this.router.navigate([navItem.route]);
  }
  onListItemEnter(index: number):void{
    this.hoveredIndex = index;
  }

  onListItemLeave():void{
    this.hoveredIndex = null;
  }


  
  sidenavContentStyle(){
    return {
      'margin-left': this.isOpen ? this.expandedWidth :  `calc(${this.iconSize} + 40px)` ,
    };
  }

  drawerContainerStyle(){
    return {
      'height' : this.drawerHeight
    }
  }

  drawerStyle() {
    const width = this.isOpen ? this.expandedWidth :  `calc(${this.iconSize} + 40px)`;
    return {
      'width': width,
      'background-color': this.drawerColor 
    }
  }

  listStyle(){
    const percentage = this.navItems.length > 8 ? 80 + '%' : ((this.navItems.length - 1) * 10) + '%';
    
    console.log(percentage);
    return{
      'height' : percentage
    }
  }

  iconStyle(index: number) {
    const backgroundColor = 
    (this.navItems[index].isSelected || this.hoveredIndex === index) ? this.hoverColor : this.fontColor;

    return {
      'background-color': backgroundColor,
      'mask-image': `url(assets/icons/${this.navItems[index].icon}.svg)`,
      'height'    : this.iconSize,
      'width'     : this.iconSize,
    };
  }

  labelStyle(index: number) {
    const isHighlighted = this.hoveredIndex === index || this.navItems[index].isSelected;
    return {
      'color': isHighlighted ? this.hoverColor : this.fontColor,
    };
  }

  
}
