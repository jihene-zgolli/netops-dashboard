import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService, Incident } from '../../services/incident';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-list.html',
  styleUrl: './incident-list.scss'
})
export class IncidentList implements OnInit {
  incidents = signal<Incident[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.incidentService.getAll().subscribe({
      next: (data) => {
        this.incidents.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Impossible de charger les incidents');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  updateStatus(incident: Incident, newStatus: string): void {
    this.incidentService.update(incident._id!, { status: newStatus }).subscribe({
      next: () => this.load()
    });
  }

  deleteIncident(id: string): void {
    if (!confirm('Supprimer cet incident ?')) return;
    this.incidentService.delete(id).subscribe({
      next: () => this.load()
    });
  }
}