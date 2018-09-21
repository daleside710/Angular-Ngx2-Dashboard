import { Component, Input } from "@angular/core";

@Component({
  selector: "gwdstatuscard",
  templateUrl: "./gwdstatuscard.component.html",
  styleUrls: ["./gwdstatuscard.component.scss"]
})
export class GwdstatuscardComponent {
  @Input()
  cardTitle: String;
  @Input()
  cardImage: String;
}
