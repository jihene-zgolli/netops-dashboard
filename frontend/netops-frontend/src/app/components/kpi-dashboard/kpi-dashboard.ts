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

  chartData = computed<ChartData<'bar'>>(() => {
    const counts = { low: 0, medium: 0, high: 0, critical: 0 };
    this.incidents().forEach((i) => {
      counts[i.severity as keyof typeof counts]++;
    });

    return {
      labels: ['Faible', 'Moyenne', 'Haute', 'Critique'],
      datasets: [{
        label: 'Nombre d\'incidents',
        data: [counts.low, counts.medium, counts.high, counts.critical],
        backgroundColor: ['#4ade80', '#facc15', '#fb923c', '#f87171']
      }]
    };
  });

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.getAll().subscribe({
      next: (data) => this.incidents.set(data)
    });
  }
}