import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Output() valueFromInput = new EventEmitter<any>();
  searchValue:any = '';
  firstItem:number;
  secondItem:number;
  thirdItem:number;
  constructor() { }

  ngOnInit(): void {
  }
  searchOnClick() {
    this.valueFromInput.emit(this.searchValue);
  }
  deleteCartItem(item) {
    this.firstItem = 1;
  }
  deleteCartItem2(item) {
    this.secondItem = 2;
  }
  deleteCartItem3(item) {
    this.thirdItem = 3;
  }
}
