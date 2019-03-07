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
