import { ActivatedRoute } from "@angular/router";
import { LocalService } from "./../../../../services/localservice";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gwdnetconns",
  templateUrl: "./gwdnetconns.component.html",
  styleUrls: ["./gwdnetconns.component.scss"]
})
export class GwdnetconnsComponent implements OnInit {
  dataNetwork = [];
  rowsOnPage = 5;
  private gateway_id;

  constructor(
    private localService: LocalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.gateway_id = this.route.snapshot.paramMap.get("id");
  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initTableView();
  }

  initTableView() {
    this.localService
      .getGatewayDetailNetConns(this.gateway_id)
      .subscribe(resData => {
        this.dataNetwork = resData.values;
      });
  }
}
