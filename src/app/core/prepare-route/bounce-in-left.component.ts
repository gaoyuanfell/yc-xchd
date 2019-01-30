import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bounceInLeft } from '../animations/route-animations';

@Component({
  selector: 'moka-bounce-in-left',
  template: '<ng-content></ng-content>',
  animations:[
    bounceInLeft
  ],
  host:{
    '[@bounceInLeft]':'prepareRoute(outlet)'
  },
  // styles:[
  //   `
  //   :host{
  //     display: flex;
  //   }
  //   `
  // ]
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
