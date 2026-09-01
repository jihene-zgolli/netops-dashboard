import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService, Incident } from '../../services/incident';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-list.html',
  styleUrl: './incident-list.scss'
})
export class IncidentList implements OnInit {
  incidents = signal<Incident[]>([]);
  loading = signal(true);
  error = signal('');

  searchTerm = signal('');
  statusFilter = signal('all');
  severityFilter = signal('all');

  filteredIncidents = computed(() => {
    let result = this.incidents();

    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      result = result.filter((i) => i.title.toLowerCase().includes(term));
    }

    if (this.statusFilter() !== 'all') {
      result = result.filter((i) => i.status === this.statusFilter());
    }

    if (this.severityFilter() !== 'all') {
      result = result.filter((i) => i.severity === this.severityFilter());
    }

    return result;
  });

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

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }
}