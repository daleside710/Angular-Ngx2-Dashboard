import { AmChartsService } from "@amcharts/amcharts3-angular";
import { LocalService } from "./../../../../services/localservice";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gwdfirewall",
  templateUrl: "./gwdfirewall.component.html",
  styleUrls: ["./gwdfirewall.component.scss"]
})
export class GwdfirewallComponent implements OnInit {
  nSelectTab = 0;
  constructor(
    private router: Router,
    private localService: LocalService,
    private route: ActivatedRoute,
    private AmCharts: AmChartsService
  ) {}

  ngOnInit() {}

  onTabSelect(aSelTab: number) {
    this.nSelectTab = aSelTab;
    let routeVal = "";
    switch (aSelTab) {
      case 0:
        routeVal = "overview";
        break;
      case 1:
        routeVal = "existing";
        break;
      case 2:
        routeVal = "edit";
        break;
    }
    this.router.navigate([routeVal], {
      relativeTo: this.route.parent
    });
  }
}
