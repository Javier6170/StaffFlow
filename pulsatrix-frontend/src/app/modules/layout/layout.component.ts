import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
isSidebarOpen = false;

  constructor(public router: Router,  private auth: AuthService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.auth.logout();
  }
}
