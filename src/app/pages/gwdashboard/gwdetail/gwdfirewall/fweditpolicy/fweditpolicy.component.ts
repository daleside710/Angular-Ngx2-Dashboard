import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-fweditpolicy",
  templateUrl: "./fweditpolicy.component.html",
  styleUrls: ["./fweditpolicy.component.scss"]
})
export class FweditpolicyComponent implements OnInit {
  model = {
    gId: "",
    chain: "",
    sourceAddress: "",
    protocol: "",
    destination: "",
    target: ""
  };

  constructor() {}

  ngOnInit() {}
}
