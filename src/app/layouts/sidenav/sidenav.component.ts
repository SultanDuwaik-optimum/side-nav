import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    CommonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {


  items: any[] = [
    {
      icon: "dashboard",
      label: "Dashboard"
    },
    {
      icon: "rules",
      label: "Rules Engine"
    },
    {
      icon: "account",
      label: "Accounts"
    },
    {
      icon: "dollar-sign",
      label: "Billing"
    },
    {
      icon: "management",
      label: "User Management"
    },
    {
      icon: "settings",
      label: "Settings"
    }
  ];

  isExpanded = true;

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  
}
