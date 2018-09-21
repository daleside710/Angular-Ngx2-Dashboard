import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flat-buttons',
  templateUrl: './flatButtons.html',
})
export class FlatButtons {

  showBtn1: boolean;
  showBtn2: boolean;
  btn1Label: string;
  btn2Label: string;

  @Input() label1: string;
  @Input() showLabel1: boolean;
  @Input() label2: string;
  @Input() showLabel2: boolean;
  @Input() rowData: any;

  @Output() btn1Emitter: EventEmitter<any> = new EventEmitter();
  @Output() btn2Emitter: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.showBtn1 = this.showLabel1;
    this.showBtn2 = this.showLabel2;
    this.btn1Label = this.label1.toString();
    this.btn2Label = this.label2.toString();
  }

  onBtn1Click() {
    this.btn1Emitter.emit(this.rowData);
  }

  onBtn2Click() {
    this.btn2Emitter.emit(this.rowData);
  }
}
