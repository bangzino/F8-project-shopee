import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formSwitch = false;
  closeModal = true;

  constructor(private router:Router) {
    //this.router.navigate(['/login']);
   }
  ngOnInit(): void {
  }
  switch() {
    this.formSwitch = !this.formSwitch;
  }
  close() {
    this.closeModal = false;
  }
}
