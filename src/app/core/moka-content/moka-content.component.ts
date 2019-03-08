/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:10:55
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:10:55
 */
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'moka-content',
  template: `<ng-content></ng-content>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MokaContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
