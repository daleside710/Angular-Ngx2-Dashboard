import { FwoverviewComponent } from "./fwoverview/fwoverview.component";
import { GwdfirewallComponent } from "./gwdfirewall.component";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { FwexispolicyComponent } from "./fwexispolicy/fwexispolicy.component";
import { FweditpolicyComponent } from "./fweditpolicy/fweditpolicy.component";

export const routes: Routes = [
  {
    path: "",
    component: GwdfirewallComponent,
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      { path: "overview", component: FwoverviewComponent },
      { path: "existing", component: FwexispolicyComponent },
      { path: "edit", component: FweditpolicyComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
