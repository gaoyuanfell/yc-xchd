/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:35
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:11:35
 */
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'moka-sidenav',
  template: `<ng-content></ng-content>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MokaSidenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
