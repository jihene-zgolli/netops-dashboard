import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  role: string;
  username: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  role: string;
  team: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';
  isLoggedIn = signal(!!localStorage.getItem('token'));
  currentRole = signal(localStorage.getItem('role') || '');
  currentUsername = signal(localStorage.getItem('username') || '');

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);
        this.isLoggedIn.set(true);
        this.currentRole.set(res.role);
        this.currentUsername.set(res.username);
      })
    );
  }

  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, payload);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn.set(false);
    this.currentRole.set('');
    this.currentUsername.set('');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}