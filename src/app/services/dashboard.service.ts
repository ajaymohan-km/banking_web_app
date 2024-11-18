import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../model/auth.model';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getCustomerDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customer`);
  }

  getBankerDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/banker`);
  }

  getAdminDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin`);
  }
}