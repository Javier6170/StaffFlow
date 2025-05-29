import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
