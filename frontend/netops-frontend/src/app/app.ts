import { Component } from '@angular/core';
import { IncidentList } from './components/incident-list/incident-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IncidentList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}