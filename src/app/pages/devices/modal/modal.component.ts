import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html'
})
export class Modal implements OnInit {

  modalHeader: string;
  modalContent: string;
  showPrimaryBtn: boolean = true;
  showSecondaryBtn: boolean = false;
  primaryBtnTitle: string = "Yes";
  secondaryBtnTitle: string = "No";

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close(this.primaryBtnTitle);
  }

  cancelModal() {
    this.activeModal.dismiss(this.secondaryBtnTitle);
  }
}
