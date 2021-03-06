/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:31
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:11:31
 */
import { Component, OnInit, ViewEncapsulation, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'moka-scroll',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[attr.class]": '"moka-scroll"',
  },
  styles:[
    `
      .moka-scroll{
        display: block;
        overflow: auto;
        height: 100%;
        background: #fff;
      }
    `
  ]
})
export class MokaScrollComponent implements OnInit {

  constructor(public ref: ElementRef) { }

  ngOnInit() {
  }

}
