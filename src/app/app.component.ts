import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'f8-project';
  
  constructor() {
    const gm = {
      enable: () => {}
    }
    window.gm = gm;
  }
}

declare global {
  interface Window { gm: any; }
}
