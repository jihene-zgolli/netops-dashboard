import { Routes } from '@angular/router';
import { IncidentList } from './components/incident-list/incident-list';
import { IncidentForm } from './components/incident-form/incident-form';
import { KpiDashboard } from './components/kpi-dashboard/kpi-dashboard';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', component: IncidentList },
  { path: 'create', component: IncidentForm },
  { path: 'login', component: Login },
  { path: 'dashboard', component: KpiDashboard },
];