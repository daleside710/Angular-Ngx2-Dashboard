import { NgaModule } from "./../../../../theme/nga.module";
import { ComsharedModule } from "./../../uicomponent/comshared.module";
import { DataTableModule } from "./../../uicomponent/datatable/DataTableModule";
import { GwdsysservicesComponent } from "./gwdsysservices.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./gwdsysservices.routing";
import { SysoverviewComponent } from "./sysoverview/sysoverview.component";
import { SysexistingComponent } from "./sysexisting/sysexisting.component";
@NgModule({
  imports: [CommonModule, NgaModule, DataTableModule, ComsharedModule, routing],
  declarations: [
    GwdsysservicesComponent,
    SysoverviewComponent,
    SysexistingComponent
  ]
})
export class GwdsysservicesModule {}
