
import { TestBed }        from '@angular/core/testing';
import { Router }         from '@angular/router';
import { SidenavService } from './sidenav.service';
import { NavItem }        from './types';

describe('SidenavService', () => {
  let service: SidenavService;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        SidenavService,
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(SidenavService);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('navigateTo', () => {
    it('should navigate to the route and set selectedNavItem if navItem is not already selected and has a route', () => {
      const navItem: NavItem = { icon: 'home', label: 'Home', route: '/home' };

      service.navigateTo(navItem);

      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(service.selectedNavItem).toEqual(navItem);
    });

    it('should not navigate if navItem is the same as the selected one', () => {
      const navItem: NavItem = { icon: 'home', label: 'Home', route: '/home' };
      service['selectedNavItem'] = navItem;

      service.navigateTo(navItem);

      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not navigate if navItem does not have a route', () => {
      const navItem: NavItem = { icon: 'home', label: 'Home' };

      service.navigateTo(navItem);

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('selectedNavItem', () => {
    it('should get the current selectedNavItem', () => {
      const navItem: NavItem = { icon: 'home', label: 'Home', route: '/home' };
      service['selectedNavItem'] = navItem;

      expect(service.selectedNavItem).toEqual(navItem);
    });

    it('should set selectedNavItem correctly', () => {
      const navItem: NavItem = { icon: 'settings', label: 'Settings', route: '/settings' };
      service.selectedNavItem = navItem;
      expect(service.selectedNavItem).toEqual(navItem);
    });
  });

  describe('navItems', () => {
    it('should trim the navItems array to a maximum of 10 items and set selectedNavItem', () => {
      const navItems: NavItem[] = Array.from({ length: 15 }, (_, i) => ({
        icon: 'icon',
        label: `Item ${i}`,
        route: `/item${i}`
      }));

      jest.spyOn(console, 'warn'); 

      service.navItems = navItems;

      expect(service.navItems.length).toBe(10);
      expect(service.selectedNavItem).toEqual(navItems[0]);
      expect(console.warn).toHaveBeenCalledWith('NavItems array was too large. Trimming to 10 items.');
    });

    it('should set the navItems array without trimming if less than or equal to 10 items and set selectedNavItem', () => {
      const navItems: NavItem[] = Array.from({ length: 5 }, (_, i) => ({
        icon: 'icon',
        label: `Item ${i}`,
        route: `/item${i}`
      }));

      service.navItems = navItems;

      expect(service.navItems.length).toBe(5);
      expect(service.selectedNavItem).toEqual(navItems[0]);
    });
  });
});
