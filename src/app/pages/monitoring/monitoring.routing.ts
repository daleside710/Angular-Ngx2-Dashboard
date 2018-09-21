import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Monitoring } from './monitoring.component';

export const routes: Routes = [
  {
    path: '',
    component: Monitoring,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
