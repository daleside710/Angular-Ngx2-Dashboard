import { SysexistingComponent } from "./sysexisting/sysexisting.component";
import { SysoverviewComponent } from "./sysoverview/sysoverview.component";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { GwdsysservicesComponent } from "./gwdsysservices.component";

export const routes: Routes = [
  {
    path: "",
    component: GwdsysservicesComponent,
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      {
        path: "overview",
        component: SysoverviewComponent
      },
      {
        path: "existing",
        component: SysexistingComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
