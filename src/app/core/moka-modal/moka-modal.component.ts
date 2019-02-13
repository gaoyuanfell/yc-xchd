import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'moka-modal',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[attr.class]": '"moka-modal"',
  },
  styles:[
    `
      .moka-modal{
        display: block;
        height: 100%;
      }
    `
  ]
})
export class MokaModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
