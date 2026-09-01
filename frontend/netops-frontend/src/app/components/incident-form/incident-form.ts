import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidentService } from '../../services/incident';

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-form.html',
  styleUrl: './incident-form.scss'
})
export class IncidentForm {
  title = '';
  type = 'data';
  severity = 'medium';
  error = '';
  success = false;

  constructor(private incidentService: IncidentService, private router: Router) {}

  onSubmit(): void {
    this.incidentService.create({ title: this.title, type: this.type, severity: this.severity }).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate(['/incidents']);
      },
      error: (err) => {
        this.error = err.status === 401 ? 'Vous devez être connectée' : 'Erreur lors de la création';
      }
    });
  }
}