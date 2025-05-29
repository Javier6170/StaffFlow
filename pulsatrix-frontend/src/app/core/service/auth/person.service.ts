import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePersonDto } from '../../model/create-person-dto';
import { UpdatePersonDto } from '../../model/update-person-dto';

@Injectable({ providedIn: 'root' })
export class PersonService {
  
  private baseUrl = `${environment.apiUrl}/persons`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(params?: any): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getAuthHeaders(), params });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(data: CreatePersonDto): Observable<any> {
    return this.http.post(this.baseUrl, data, { headers: this.getAuthHeaders() });
  }

  update(id: string, data: UpdatePersonDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}