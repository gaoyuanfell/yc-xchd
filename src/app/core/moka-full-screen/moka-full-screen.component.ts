/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-20 09:28:03
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-20 18:04:32
 */
import { AfterContentInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation, AfterContentChecked } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RetainService } from 'src/app/components/retain/retain.service';

@Component({
  selector: 'moka-full-screen',
  template: `<ng-content></ng-content>`,
  styles: [
    `
    .moka-full-screen{
      transition: all 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
      display: block;
      position: fixed;
      width: 100%;
      height: 100%;
    }
    `
  ],
  host:{
    '[attr.class]':'"moka-full-screen"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MokaFullScreenComponent implements OnInit, AfterContentInit {


  open(){
    this.addStyle({top: 0, left: 0})
    this._opend = true;
  }

  close(){
    this.addStyle(this.bcrt)
    this._opend = false;
  }

  toggle(){
    this._opend ? this.close() : this.open()
  }

  private _opend = false

  get opend(){
    return this._opend;
  }

  addStyle(bcrt){
    for (const [key, value] of Object.entries(bcrt)) {
      this.renderer.setStyle(this.ref.nativeElement, key, `${value}px`)
    }
  }

  private _drawer:MatSidenav
  @Input('drawer') set drawer(val: MatSidenav){
    this._drawer = val;
    if(this._drawer){
      this._drawer.openedChange.subscribe((event)=> {
        this.retainService.subscribe()
      })
    }
  }

  get drawer(){
    return this._drawer;
  }

  bcrt

  constructor(private changeDetectorRef: ChangeDetectorRef, private ref: ElementRef, private renderer: Renderer2, private retainService:RetainService) {

  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    let bcrt = (this.ref.nativeElement as HTMLDivElement).getBoundingClientRect()
    this.bcrt = {
      top: bcrt.top,
      left: bcrt.left
    }
    this.addStyle(this.bcrt)
  }
}
