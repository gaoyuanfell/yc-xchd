import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moka-modal',
  template: `<ng-content></ng-content>`,
  styles:[
    `
      :host{
        display: block;
      }
    `
  ]
})
export class MokaModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
