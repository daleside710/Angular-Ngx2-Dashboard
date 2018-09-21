import { ActivatedRoute } from "@angular/router";
import { LocalService } from "./../../../../../services/localservice";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-fwexispolicy",
  templateUrl: "./fwexispolicy.component.html",
  styleUrls: ["./fwexispolicy.component.scss"]
})
export class FwexispolicyComponent implements OnInit {
  dataExistingPolice = [];
  constructor(
    private localService: LocalService,
    private route: ActivatedRoute
  ) {}
  private gateway_id;
  ngOnInit() {
    this.gateway_id = this.route.snapshot.paramMap.get("id");
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.localService
      .getGatewayDetailFWExisting(this.gateway_id)
      .subscribe(resData => {
        this.dataExistingPolice = resData.values;
      });
  }

  onNew() {
    console.log("start");
  }

  onDisable() {
    console.log("refresh");
  }

  onEnable() {
    console.log("stop");
  }

  onEdit() {
    console.log("stop");
  }

  onDelete() {
    console.log("stop");
  }

  onSelectGateway(value: any) {}
}
