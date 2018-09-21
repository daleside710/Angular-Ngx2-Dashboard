import { ActivatedRoute } from "@angular/router";
import { LocalService } from "./../../../../../services/localservice";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sysexisting",
  templateUrl: "./sysexisting.component.html",
  styleUrls: ["./sysexisting.component.scss"]
})
export class SysexistingComponent implements OnInit {
  dataExistingService = [];
  public gateway_id;

  constructor(
    private route: ActivatedRoute,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gateway_id = this.route.snapshot.paramMap.get("id");
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.localService
      .getGatewayDetailSSExisting(this.gateway_id)
      .subscribe(resData => {
        this.dataExistingService = resData.Services_List;
        console.log(this.dataExistingService);
      });
  }

  onStart() {
    console.log("start");
  }

  onRefresh() {
    console.log("refresh");
  }

  onStop() {
    console.log("stop");
  }

  onSelectGateway(value: any) {
    console.log(value);
  }
}
