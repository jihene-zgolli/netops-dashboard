import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Incident {
  _id?: string;
  title: string;
  type: string;
  severity: string;
  status: string;
  kpiImpact: number;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private apiUrl = '/api/incidents';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUrl);
  }

  create(incident: Partial<Incident>): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, incident);
  }

  update(id: string, incident: Partial<Incident>): Observable<Incident> {
    return this.http.put<Incident>(`${this.apiUrl}/${id}`, incident);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}