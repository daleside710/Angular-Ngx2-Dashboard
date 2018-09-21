import { GwdnetconnsComponent } from "./gwdnetconns.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./gwdnetconns.routing";
import { DataTableModule } from "../../uicomponent/datatable/Index";

@NgModule({
  imports: [CommonModule, DataTableModule, routing],
  declarations: [GwdnetconnsComponent]
})
export class GwdnetconnsModule {}
