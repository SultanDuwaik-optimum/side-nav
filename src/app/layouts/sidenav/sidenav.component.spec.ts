import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { SidenavService } from './sidenav.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavItem } from './types';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let sidenavService: jest.Mocked<SidenavService>;

  beforeEach(waitForAsync(() => {
    const sidenavServiceMock = {
      navigateTo: jest.fn(),
      navItems: []
    };

    TestBed.configureTestingModule({
      imports: [MatSidenavModule, CommonModule, MatButtonModule, BrowserAnimationsModule],
      declarations: [SidenavComponent],
      providers: [
        { provide: SidenavService, useValue: sidenavServiceMock }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SidenavComponent);
      component = fixture.componentInstance;
      sidenavService = TestBed.inject(SidenavService) as jest.Mocked<SidenavService>;

      // Set default properties for the component
      component.navItems = [
        { icon: 'account.svg', label: 'Home', route: '/home' },
        { icon: 'settings.svg', label: 'Settings', route: '/settings' }
      ];
      component.iconSize = '27px';
      component.hoverColor = '#81D0A6';
      component.fontColor = '#FFFFFF';
      component.drawerColor = '#000000';
      component.drawerHeight = '100vh';
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidenav state', () => {
    component.isOpen = true;
    component.toggleSidenav();
    expect(component.isOpen).toBe(false);

    component.toggleSidenav();
    expect(component.isOpen).toBe(true);
  });

  it('should call sidenavService.navigateTo() on navigateTo()', () => {
    const navItem = { icon: 'account.svg', label: 'Home', route: '/home' };
    component.navigateTo(navItem);
    expect(sidenavService.navigateTo).toHaveBeenCalledWith(navItem);
  });

  it('should update hoveredNavItem on onListItemEnter()', () => {
    const navItem = { icon: 'settings.svg', label: 'Settings', route: '/settings' };
    component.onListItemEnter(navItem);
    expect(component.hoveredNavItem).toEqual(navItem);
  });

  it('should clear hoveredNavItem on onListItemLeave()', () => {
    component.hoveredNavItem = { icon: 'settings.svg', label: 'Settings', route: '/settings' };
    component.onListItemLeave();
    expect(component.hoveredNavItem).toBeNull();
  });

  it('should return correct sidenav content style based on isOpen', () => {
    component.isOpen = true;
    expect(component.sidenavContentStyle()).toEqual({ 'margin-left': component.expandedWidth });

    component.isOpen = false;
    expect(component.sidenavContentStyle()).toEqual({ 'margin-left': `calc(${component.iconSize} + 40px)` });
  });

  it('should return correct drawer container style', () => {
    expect(component.drawerContainerStyle()).toEqual({ height: component.drawerHeight });
  });

  it('should return correct drawer style based on isOpen', () => {
    component.isOpen = true;
    expect(component.drawerStyle()).toEqual({
      width: component.expandedWidth,
      'background-color': component.drawerColor
    });

    component.isOpen = false;
    expect(component.drawerStyle()).toEqual({
      width: `calc(${component.iconSize} + 40px)`,
      'background-color': component.drawerColor
    });
  });

  it('should return correct list style based on navItems length', () => {
    // Set navItems length to 5
    component.sidenavService.navItems = Array(5).fill({ icon: 'icon.svg', label: 'Item' });
    expect(component.listStyle()).toEqual({ height: '45%' });

    // Set navItems length to 2
    component.sidenavService.navItems = Array(2).fill({ icon: 'icon.svg', label: 'Item' });
    expect(component.listStyle()).toEqual({ height: '18%' });
  });

  it('should return correct icon style based on selection and hover state', () => {
    const navItem = { icon: 'account.svg', label: 'Home', route: '/home' };
    
    // When the item is selected
    component.sidenavService.selectedNavItem = navItem;
    component.hoveredNavItem = navItem;
    expect(component.iconStyle(navItem)).toEqual({
      'background-color': component.hoverColor,
      'mask-image': `url(assets/icons/${navItem.icon})`,
      height: component.iconSize,
      width: component.iconSize
    });

    // When the item is not hovered
    component.hoveredNavItem = null;
    expect(component.iconStyle(navItem)).toEqual({
      'background-color': component.fontColor,
      'mask-image': `url(assets/icons/${navItem.icon})`,
      height: component.iconSize,
      width: component.iconSize
    });
  });

  it('should return correct label style based on selection and hover state', () => {
    const navItem1: NavItem = { icon: 'account.svg', label: 'Home1', route: '/home1' };
    const navItem2: NavItem = { icon: 'account.svg', label: 'Home2', route: '/home2' };
    const navItem3: NavItem = { icon: 'account.svg', label: 'Home3', route: '/home3' };

    component.sidenavService.navItems = [navItem1, navItem2, navItem3];

    // When the item is selected and hovered
    component.sidenavService.selectedNavItem = navItem1;
    component.hoveredNavItem = navItem1;
    expect(component.labelStyle(navItem1)).toEqual({ color: component.hoverColor });

    // When the item is hovered but not selected
    component.hoveredNavItem = navItem2;
    expect(component.labelStyle(navItem1)).toEqual({ color: component.hoverColor });

    // When the item is not hovered and not selected
    expect(component.labelStyle(navItem2)).toEqual({ color: component.fontColor });
    expect(component.labelStyle(navItem3)).toEqual({ color: component.fontColor });
  });

  it('should set the navItems and update selectedNavItem on ngOnInit', () => {
    const navItems: NavItem[] = [
      { icon: 'icon1.svg', label: 'Item 1', route: '/item1' },
      { icon: 'icon2.svg', label: 'Item 2', route: '/item2' }
    ];

    component.navItems = navItems;
    component.ngOnInit();
    
    expect(sidenavService.navItems).toEqual(navItems);
    expect(component.hoveredNavItem).toEqual(navItems[0]);
  });

});
