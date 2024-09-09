import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavComponent } from './sidenav.component';
import { NavItem } from './types';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatButtonModule,
        CommonModule,
        RouterTestingModule,
        SidenavComponent,  // Include standalone component in imports
        BrowserAnimationsModule
      ],
      providers: [Router]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidenav state', () => {
    component.isOpen = false;
    component.toggleSidenav();
    expect(component.isOpen).toBeTrue();
    
    component.toggleSidenav();
    expect(component.isOpen).toBeFalse();
  });

  it('should navigate to route and update selected nav item', () => {
    const navItems: NavItem[] = [
      { label: 'Item 1', route: '/item1', icon: 'icon1', isSelected: false },
      { label: 'Item 2', route: '/item2', icon: 'icon2', isSelected: false }
    ];
    component.navItems = navItems;
    const navItem = navItems[0];

    spyOn(router, 'navigate');
    component.navigateTo(navItem);

    expect(navItem.isSelected).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith([navItem.route]);

    // Check if other items are deselected
    navItems.forEach(item => {
      if (item !== navItem) {
        expect(item.isSelected).toBeFalse();
      }
    });
  });

  it('should update hoveredIndex on mouse enter and leave', () => {
    component.onListItemEnter(1);
    expect(component.hoveredIndex).toBe(1);

    component.onListItemLeave();
    expect(component.hoveredIndex).toBeNull();
  });

  it('should return correct styles for sidenav content', () => {
    component.isOpen = true;
    component.expandedWidth = '300px';
    component.iconSize = '30px';
    expect(component.sidenavContentStyle()).toEqual({
      'margin-left': '300px'
    });

    component.isOpen = false;
    expect(component.sidenavContentStyle()).toEqual({
      'margin-left': 'calc(30px + 40px)'
    });
  });

  it('should return correct styles for drawer container', () => {
    component.drawerHeight = '80vh';
    expect(component.drawerContainerStyle()).toEqual({
      'height': '80vh'
    });
  });

  it('should return correct styles for drawer', () => {
    component.isOpen = true;
    component.expandedWidth = '300px';
    component.drawerColor = '#123456';
    expect(component.drawerStyle()).toEqual({
      'width': '300px',
      'background-color': '#123456'
    });

    component.isOpen = false;
    expect(component.drawerStyle()).toEqual({
      'width': 'calc(27px + 40px)',
      'background-color': '#123456'
    });
  });

  it('should return correct styles for list', () => {
    component.navItems = Array(9).fill({} as NavItem);
    expect(component.listStyle()).toEqual({
      'height': '80%'
    });

    component.navItems = Array(5).fill({} as NavItem);
    expect(component.listStyle()).toEqual({
      'height': '40%'
    });
  });

  it('should return correct styles for icon', () => {
    component.hoverColor = '#FF0000';
    component.fontColor = '#00FF00';
    const navItems: NavItem[] = [{ label: 'Item 1', icon: 'icon1', isSelected: true }];
    component.navItems = navItems;

    expect(component.iconStyle(0)).toEqual({
      'background-color': '#FF0000',
      'mask-image': 'url(assets/icons/icon1.svg)',
      'height': '27px',
      'width': '27px'
    });
  });

  it('should return correct styles for label', () => {
    component.hoverColor = '#FF0000';
    component.fontColor = '#00FF00';
    const navItems: NavItem[] = [
      { label: 'Item 1', icon: 'icon1', isSelected: true },
      { label: 'Item 2', icon: 'icon2', isSelected: false }
    ];
    component.navItems = navItems;

    expect(component.labelStyle(0)).toEqual({
      'color': '#FF0000'
    });
    expect(component.labelStyle(1)).toEqual({
      'color': '#00FF00'
    });
  });
});
