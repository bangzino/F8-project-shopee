import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formSwitch = false;
  closeModal = true;

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
