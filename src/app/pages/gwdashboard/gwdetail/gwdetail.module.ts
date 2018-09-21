import { ComsharedModule } from "./../uicomponent/comshared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./gwdetail.routing";
import { GwdetailComponent } from "./gwdetail.component";
import { GwdoverviewComponent } from "./gwdoverview/gwdoverview.component";
import { NgaModule } from "../../../theme/nga.module";

@NgModule({
  imports: [CommonModule, NgaModule, routing, ComsharedModule],
  declarations: [GwdetailComponent, GwdoverviewComponent]
})
export class GwdetailModule {}
