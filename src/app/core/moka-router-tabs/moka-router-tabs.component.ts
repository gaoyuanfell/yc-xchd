/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-18 18:49:13
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-18 19:46:58
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd, NavigationEnd, RouteConfigLoadStart } from '@angular/router';

@Component({
  selector: 'app-moka-router-tabs',
  templateUrl: './moka-router-tabs.component.html',
  styleUrls: ['./moka-router-tabs.component.less']
})
export class MokaRouterTabsComponent implements OnInit {

  constructor(private router:Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe(event => {
      if(event instanceof RouteConfigLoadStart){
        console.info(event);
      }
      if(event instanceof ActivationEnd){
        // console.info(event);
      }
      if(event instanceof NavigationEnd){
        // console.info(event);
      }
    })
  }

  ngOnInit() {
    console.info(this.activatedRoute)
  }

}
