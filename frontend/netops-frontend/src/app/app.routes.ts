import { Routes } from '@angular/router';
import { IncidentList } from './components/incident-list/incident-list';
import { IncidentForm } from './components/incident-form/incident-form';
import { KpiDashboard } from './components/kpi-dashboard/kpi-dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'incidents', component: IncidentList, canActivate: [authGuard] },
  { path: 'create', component: IncidentForm, canActivate: [authGuard] },
  { path: 'dashboard', component: KpiDashboard, canActivate: [authGuard] },
];