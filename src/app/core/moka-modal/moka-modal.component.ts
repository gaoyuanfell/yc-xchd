/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:27
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:11:27
 */
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'moka-modal',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[attr.class]": '"moka-modal"',
  },
  styles:[
    `
      .moka-modal{
        display: block;
        padding: 0 30px 30px;
      }
    `
  ]
})
export class MokaModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
