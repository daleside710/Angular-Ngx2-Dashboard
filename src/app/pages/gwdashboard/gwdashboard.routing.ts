import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { GwmainComponent } from "./gwmain/gwmain.component";
import { GwdashboardComponent } from "./gwdashboard.component";

export const routes: Routes = [
  {
    path: "",
    component: GwdashboardComponent,
    children: [
      { path: "", redirectTo: "gwmain", pathMatch: "full" },
      { path: "gwmain", component: GwmainComponent },
      {
        path: "gwdetail/:id",
        loadChildren: "./gwdetail/gwdetail.module#GwdetailModule"
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
