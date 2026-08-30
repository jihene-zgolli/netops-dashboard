import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { IncidentService, Incident } from '../../services/incident';

@Component({
  selector: 'app-kpi-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './kpi-dashboard.html',
  styleUrl: './kpi-dashboard.scss'
})
export class KpiDashboard implements OnInit {
  incidents = signal<Incident[]>([]);

  severityChartData = computed<ChartData<'bar'>>(() => {
    const counts = { low: 0, medium: 0, high: 0, critical: 0 };
    this.incidents().forEach((i) => {
      counts[i.severity as keyof typeof counts]++;
    });
    return {
      labels: ['Faible', 'Moyenne', 'Haute', 'Critique'],
      datasets: [{
        label: 'Incidents',
        data: [counts.low, counts.medium, counts.high, counts.critical],
        backgroundColor: ['#4ade80', '#facc15', '#fb923c', '#f87171']
      }]
    };
  });

  statusChartData = computed<ChartData<'pie'>>(() => {
    const counts = { open: 0, in_progress: 0, resolved: 0 };
    this.incidents().forEach((i) => {
      counts[i.status as keyof typeof counts]++;
    });
    return {
      labels: ['Ouvert', 'En cours', 'Résolu'],
      datasets: [{
        data: [counts.open, counts.in_progress, counts.resolved],
        backgroundColor: ['#f87171', '#facc15', '#4ade80']
      }]
    };
  });

  typeChartData = computed<ChartData<'doughnut'>>(() => {
    const counts = { roaming: 0, data: 0, voix: 0, core: 0 };
    this.incidents().forEach((i) => {
      counts[i.type as keyof typeof counts]++;
    });
    return {
      labels: ['Roaming', 'Data', 'Voix', 'Core'],
      datasets: [{
        data: [counts.roaming, counts.data, counts.voix, counts.core],
        backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399']
      }]
    };
  });

  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } }
  };

  doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } }
  };

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.getAll().subscribe({
      next: (data) => this.incidents.set(data)
    });
  }
}