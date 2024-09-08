import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() openDrawer = new EventEmitter<boolean>(); 

  isDrawerOpen: boolean = false;


  openDrawerFunction(){
    this.isDrawerOpen = !this.isDrawerOpen;
    return this.openDrawer.emit(this.isDrawerOpen);
  }
}
