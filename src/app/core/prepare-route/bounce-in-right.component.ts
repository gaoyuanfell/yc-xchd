import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bounceInRight } from '../animations/route-animations';

@Component({
  selector: 'moka-bounce-in-right',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations:[
    bounceInRight
  ],
  host:{
    '[@bounceInRight]':'prepareRoute(outlet)'
  }
})
export class BounceInRightComponent{

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
