import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bounceInLeft } from '../animations/route-animations';

@Component({
  selector: 'moka-bounce-in-left',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations:[
    bounceInLeft
  ],
  host:{
    '[@bounceInLeft]':'prepareRoute(outlet)'
  },
})
export class BounceInLeftComponent{

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  @Input() outlet: RouterOutlet;

  constructor() { }

}
