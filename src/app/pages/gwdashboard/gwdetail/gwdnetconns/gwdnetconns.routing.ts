import { GwdnetconnsComponent } from "./gwdnetconns.component";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  {
    path: "",
    component: GwdnetconnsComponent,
    children: [{ path: "", redirectTo: "overview", pathMatch: "full" }]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
