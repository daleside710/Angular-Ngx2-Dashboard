import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Devices } from './devices.component';

export const routes: Routes = [
  {
    path: ':status',
    component: Devices,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
