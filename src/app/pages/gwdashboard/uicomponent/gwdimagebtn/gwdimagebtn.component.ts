import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "gwdimagebtn",
  templateUrl: "./gwdimagebtn.component.html",
  styleUrls: ["./gwdimagebtn.component.scss"]
})
export class GwdimagebtnComponent implements OnInit {
  constructor() {}
  @Input()
  btnImage: string;
  @Input()
  btnTitle: string;

  //@Output()
  //click: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {}

  //onClick() {
  //    this.click.emit(true);
  //  }
}
