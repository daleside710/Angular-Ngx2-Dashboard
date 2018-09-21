import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

import { ChartistModule } from 'ng-chartist';

import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmChartsModule,
    ChartistModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    Dashboard
  ],
  providers: [
  ]
})
export class DashboardModule {}
