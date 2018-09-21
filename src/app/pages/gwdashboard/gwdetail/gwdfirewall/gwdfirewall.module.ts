import { FormsModule } from "@angular/forms";
import { NgaModule } from "./../../../../theme/nga.module";
import { DataTableModule } from "./../../uicomponent/datatable/DataTableModule";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./gwdfirewall.routing";
import { GwdfirewallComponent } from "./gwdfirewall.component";
import { FwoverviewComponent } from "./fwoverview/fwoverview.component";
import { FwexispolicyComponent } from "./fwexispolicy/fwexispolicy.component";
import { FweditpolicyComponent } from "./fweditpolicy/fweditpolicy.component";
import { ComsharedModule } from "../../uicomponent/comshared.module";

@NgModule({
  imports: [
    CommonModule,
    ComsharedModule,
    NgaModule,
    FormsModule,
    DataTableModule,
    routing
  ],
  declarations: [
    GwdfirewallComponent,
    FwoverviewComponent,
    FwexispolicyComponent,
    FweditpolicyComponent
  ]
})
export class GwdfirewallModule {}
