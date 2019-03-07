import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeInOut } from '../animations/route-animations';

@Component({
  selector: 'moka-fade-in-out',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations:[
    fadeInOut
  ],
  host:{
    '[@fadeInOut]':'prepareRoute(outlet)'
  }
})
export class FadeInOutComponent{

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
