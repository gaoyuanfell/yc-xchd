/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:04
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:11:04
 */
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'moka-header',
  template: '<ng-content></ng-content>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MokaHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
