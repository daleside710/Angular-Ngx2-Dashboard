import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LeafletMapsModule } from "./pages/leafletMaps/leafletMaps.module";
import { TranslateService } from "@ngx-translate/core";
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from "./app.routing";

// App is our top level component
import { App } from "./app.component";
import { AppState, InternalStateType } from "./app.service";
import { GlobalState } from "./global.state";
import { NgaModule } from "./theme/nga.module";
import { PagesModule } from "./pages/pages.module";
import { APIService } from "./services/api.service";
import { LeafletPointsService } from "./services/leaflet-points.service";
import { AmChartsModule } from "@amcharts/amcharts3-angular";

// Application wide providers
const APP_PROVIDERS = [AppState, GlobalState];

export type StoreType = {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [App],
  imports: [
    // import Angular's modules
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    LeafletMapsModule,
    AmChartsModule,
    routing
  ],
  providers: [
    // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    APIService,
    LeafletPointsService
  ]
})
export class AppModule {
  constructor(public appState: AppState) {}
}
