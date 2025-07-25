import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SoigneurDto, CreateSoigneurDto } from '../../dto/soigneur.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3001'; // Assurez-vous que c'est le bon port

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Supprimez temporairement l'en-tête d'autorisation
      // 'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  get<T>(url: string): Observable<T> {
    console.log(`API GET: ${this.apiUrl}${url}`);
    return this.http.get<T>(`${this.apiUrl}${url}`, {
      headers: this.getHeaders(),
    }).pipe(
      tap({
        next: (data) => console.log(`GET ${url} response:`, data),
        error: (error) => console.error(`GET ${url} error:`, error)
      })
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    console.log(`API POST: ${this.apiUrl}${url}`, body);
    return this.http.post<T>(`${this.apiUrl}${url}`, body, {
      headers: this.getHeaders(),
    }).pipe(
      tap({
        next: (data) => console.log(`POST ${url} response:`, data),
        error: (error) => console.error(`POST ${url} error:`, error)
      })
    );
  }

  patch<T>(url: string, body: any = {}): Observable<T> {
    console.log(`API PATCH: ${this.apiUrl}${url}`, body);
    return this.http.patch<T>(`${this.apiUrl}${url}`, body, {
      headers: this.getHeaders(),
    }).pipe(
      tap({
        next: (data) => console.log(`PATCH ${url} response:`, data),
        error: (error) => console.error(`PATCH ${url} error:`, error)
      })
    );
  }

  delete<T>(url: string): Observable<T> {
    console.log(`API DELETE: ${this.apiUrl}${url}`);
    return this.http.delete<T>(`${this.apiUrl}${url}`, {
      headers: this.getHeaders(),
    }).pipe(
      tap({
        next: (data) => console.log(`DELETE ${url} response:`, data),
        error: (error) => console.error(`DELETE ${url} error:`, error)
      })
    );
  }

  // MÉTHODES POUR LES SOIGNEURS
  getSoigneurs(): Observable<SoigneurDto[]> {
    return this.get<SoigneurDto[]>('/soigneurs');
  }

  getSoigneur(id: number): Observable<SoigneurDto> {
    return this.get<SoigneurDto>(`/soigneurs/${id}`);
  }

  createSoigneur(soigneur: CreateSoigneurDto): Observable<SoigneurDto> {
    return this.post<SoigneurDto>('/soigneurs', soigneur);
  }

  deleteSoigneur(id: number): Observable<{message: string}> {
    return this.delete<{message: string}>(`/soigneurs/${id}`);
  }
}
