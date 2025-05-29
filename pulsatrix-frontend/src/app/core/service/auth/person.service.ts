import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CreatePersonDto } from '../../model/create-person-dto';
import { UpdatePersonDto } from '../../model/update-person-dto';

@Injectable({ providedIn: 'root' })
export class PersonService {
  
  private baseUrl = `${environment.apiUrl}/persons`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAll(params?: any): Observable<any> {
  return this.http
    .get(this.baseUrl, { headers: this.getAuthHeaders(), params })
    .pipe(catchError(this.handleError));
}

  getById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  create(data: CreatePersonDto): Observable<any> {
    return this.http.post(this.baseUrl, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  update(id: string, data: UpdatePersonDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  byDepartment(): Observable<{ department: string; count: number;}[]> {
    return this.http.get<{ data: any }>(`${this.baseUrl}/stats/by-department`)
      .pipe(map(res => res.data));
  }

  byMonth(): Observable<{ month: string; hires: number;}[]> {
    return this.http.get<{ data: any }>(`${this.baseUrl}/stats/by-month`)
      .pipe(map(res => res.data));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    const message = error?.error?.message || 'Error desconocido del servidor';
    console.error('API error:', message);
    return throwError(() => new Error(message));
  }
}