import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Si ya hay token válido, enviar al dashboard
    if (this.auth.isAuthenticated()) {
      return this.router.createUrlTree(['/dashboard']);
    }
    // Si no está autenticado, permitir acceso a /auth/*
    return true;
  }
}
