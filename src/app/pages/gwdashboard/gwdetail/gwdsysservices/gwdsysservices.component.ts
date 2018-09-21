import { AmChartsService } from "@amcharts/amcharts3-angular";
import { LocalService } from "./../../../../services/localservice";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-gwdsysservices",
  templateUrl: "./gwdsysservices.component.html",
  styleUrls: ["./gwdsysservices.component.scss"]
})
export class GwdsysservicesComponent implements OnInit {
  nSelectTab = 0;
  constructor(
    private router: Router,
    private localService: LocalService,
    private route: ActivatedRoute,
    private AmCharts: AmChartsService
  ) {}

  ngOnInit() {
    // this.gateway_id = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => params.get("id"))
    // );
    //this.gateway_id = this.route.parent.snapshot.params.get("id");
    // this.route.queryParamMap
    //   .map(params => {
    //     console.log(params);
    //     return params.get("id") || "none";
    //   })
    //   .subscribe(value => {
    //     console.log(value);
    //   });
    // console.log(this.route.queryParamMap);
  }

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
    }
    this.router.navigate([routeVal], {
      relativeTo: this.route.parent
    });
  }
}
