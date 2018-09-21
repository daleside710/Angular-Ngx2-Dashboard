import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { LeafletMaps } from './leafletMaps';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: 'app/pages/login/login.module#LoginModule'
  // },
  // {
  //   path: 'register',
  //   loadChildren: 'app/pages/register/register.module#RegisterModule'
  // },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'devices', loadChildren: './devices/devices.module#DevicesModule' },
      { path: 'monitoring', loadChildren: './monitoring/monitoring.module#MonitoringModule' },
      { path: 'gwdashboard', loadChildren: './gwdashboard/gwdashboard.module#GwDashboardModule' },
      { path: 'leaflet', component: LeafletMaps }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
