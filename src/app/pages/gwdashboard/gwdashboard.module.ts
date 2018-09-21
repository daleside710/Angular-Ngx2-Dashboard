import { GwdsimplepieComponent } from "./uicomponent/gwdsimplepie/gwdsimplepie.component";
import { GwdstatuscardComponent } from "./uicomponent/gwdstatuscard/gwdstatuscard.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./gwdashboard.routing";
import { NgaModule } from "../../theme/nga.module";
import { AppTranslationModule } from "../../app.translation.module";

import { DevicesService } from "../../services/devices.service";
import { GatewaysService } from "../../services/gateways.service";

import { GwmainComponent } from "./gwmain/gwmain.component";
import { LocalService } from "../../services/localservice";
import { GwdashboardComponent } from "./gwdashboard.component";
import { DataTableModule } from "./uicomponent/datatable/DataTableModule";

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    DataTableModule,
    routing
  ],
  declarations: [GwdashboardComponent, GwmainComponent],
  providers: [DevicesService, GatewaysService, LocalService]
})
export class GwDashboardModule {}
