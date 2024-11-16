import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../model/auth.model';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
  private document = inject(DOCUMENT);
  private window = this.document.defaultView;
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password },this.httpOptions)
      .pipe(
        tap((response: AuthResponse) => {
          this.window?.localStorage.setItem('token', response.token);
          this.window?.localStorage.setItem('username', response.username);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, this.httpOptions)
      .pipe(
        tap(response => {
          console.log('Registration response:', response);
        })
      );
  }

  logout(): void {
    this.window?.localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.window?.localStorage.getItem('token');
  }
}
  