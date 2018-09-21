import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { GwdetailComponent } from "./gwdetail.component";
import { GwdoverviewComponent } from "./gwdoverview/gwdoverview.component";

export const routes: Routes = [
  {
    path: "",
    component: GwdetailComponent,
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      {
        path: "overview",
        component: GwdoverviewComponent
      },
      {
        path: "firewall",
        loadChildren: "./gwdfirewall/gwdfirewall.module#GwdfirewallModule"
      },
      {
        path: "systemservices",
        loadChildren:
          "./gwdsysservices/gwdsysservices.module#GwdsysservicesModule"
      },
      {
        path: "networkconnection",
        loadChildren: "./gwdnetconns/gwdnetconns.module#GwdnetconnsModule"
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
