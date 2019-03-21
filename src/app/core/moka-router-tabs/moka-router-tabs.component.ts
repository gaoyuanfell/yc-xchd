/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-18 18:49:13
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-19 16:04:52
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter, takeUntil, map, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-moka-router-tabs',
  templateUrl: './moka-router-tabs.component.html',
  styleUrls: ['./moka-router-tabs.component.less'],
  host:{
    '[attr.class]':'"moka-router-tabs"',
    '[hidden]':'!cache.length',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MokaRouterTabsComponent implements OnInit {

  cache:NavigationEnd[] = [];

  isHeand = false;

  go(url){
    this.isHeand = true;
    this.router.navigate([url]).then(()=> {
      this.isHeand = false;
    })
  }

  remove(event:Event,index){
    event.stopPropagation()
    if(this.cache.length === 1) return;
    this.cache.splice(index, 1);
  }

  constructor(private router:Router, private changeDetectorRef:ChangeDetectorRef, private ref:ElementRef, private activatedRoute: ActivatedRoute) {
    router.events.pipe(filter(() => !this.isHeand)).subscribe(event => {
      if(event instanceof NavigationEnd){
        this.cache.push(event)
        this.changeDetectorRef.markForCheck()
      }
    })
  }

  ngOnInit() {
    let mousedown = fromEvent(this.ref.nativeElement, 'mousedown')
    let mouseout = fromEvent(this.ref.nativeElement, 'mouseout')
    let mouseup = fromEvent(this.ref.nativeElement, 'mouseup')
    let mousemove = fromEvent(this.ref.nativeElement, 'mousemove')
    mousedown.pipe(map((event:MouseEvent) => {return {x:event.x, y: event.y}})).subscribe(xy => {
      let startX = xy.x
      let startY = xy.y
      mousemove.pipe(takeUntil(mouseout), takeUntil(mouseup), map((event:MouseEvent) => {return {x:event.x, y: event.y}})).subscribe(xy2 => {
        let x = xy2.x - startX
        let y = xy2.y - startY
      })
    })
  }

}
