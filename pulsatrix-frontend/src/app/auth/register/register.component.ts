import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupData = { name: '', email: '', password: '' };
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup(): void {
    if (this.loading) return;
    this.loading = true;

    this.authService.register(
      this.signupData.name,
      this.signupData.email,
      this.signupData.password
    )
    .subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: err.error?.message || 'No se pudo registrar'
        });
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
