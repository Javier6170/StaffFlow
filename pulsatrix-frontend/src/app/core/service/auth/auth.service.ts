import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

export interface AuthResponse {
  data: any;
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedToken = localStorage.getItem('token');
    this.tokenSubject = new BehaviorSubject<string | null>(storedToken);
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiAuthUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          const token = res.data.accessToken;
          localStorage.setItem('token', token);
          this.tokenSubject.next(token);
        })
      );
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiAuthUrl}/register`, { name, email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.accessToken);
          this.tokenSubject.next(res.accessToken);
        })
      );
  }

  logout(): void {
    const token = this.getToken();
    if (token) {
      // Llamada al endpoint de logout en el servidor
      this.http.post(`${environment.apiAuthUrl}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        // Ignoramos la respuesta (204 No Content)
        next: () => this.clearSession(),
        error: () => this.clearSession() // igual limpiamos aunque falle
      });
    } else {
      this.clearSession();
    }
  }

  private clearSession() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  
  getToken(): string | null {
  const localToken = localStorage.getItem('token');
  if (localToken && this.tokenSubject.value !== localToken) {
    this.tokenSubject.next(localToken);
  }
  return this.tokenSubject.value;
}

  isAuthenticated(): boolean {
  const token = this.getToken();
  if (!token) return false;

  // Verifica que el token no esté expirado (opcional si ya validas en backend)
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp;
  const now = Math.floor(Date.now() / 1000);
  return exp > now;
}

}
