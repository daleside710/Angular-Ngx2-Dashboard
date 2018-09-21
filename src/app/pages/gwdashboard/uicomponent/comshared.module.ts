import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GwdsimplepieComponent } from "./gwdsimplepie/gwdsimplepie.component";
import { GwdstatuscardComponent } from "./gwdstatuscard/gwdstatuscard.component";
import { GwdimagebtnComponent } from "./gwdimagebtn/gwdimagebtn.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    GwdsimplepieComponent,
    GwdstatuscardComponent,
    GwdimagebtnComponent
  ],
  exports: [GwdsimplepieComponent, GwdstatuscardComponent, GwdimagebtnComponent]
})
export class ComsharedModule {}
