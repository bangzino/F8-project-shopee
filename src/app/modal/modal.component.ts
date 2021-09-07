import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  formSwitch = true;
  closeModal = false;

  constructor() { }

  ngOnInit(): void {
  }
  switch() {
    this.formSwitch = !this.formSwitch;
  }
  close() {
    this.closeModal = false;
  }
}
