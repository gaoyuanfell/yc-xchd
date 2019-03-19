import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewEncapsulation, Input } from '@angular/core';
import { PinService } from 'src/app/components/pin/pin.service';
import { MatSidenav } from '@angular/material';

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
  animations:[
    trigger('openClose', [
      state('open', style({
        top: 0,
        left: 0
      })),
      state('close', style({})),
      transition('close <=> open', [
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ]),
    ])
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
    this.pinService.subscribe()
    this.changeDetectorRef.markForCheck()
  }

  close(){
    this.addStyle(this.bcrt)
    this._opend = false;
    this.pinService.subscribe()
    this.changeDetectorRef.markForCheck()
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

  removeStyle(bcrt){

  }

  private _drawer:MatSidenav
  @Input('drawer') set drawer(val: MatSidenav){
    this._drawer = val;
    if(this._drawer){
      this._drawer.openedChange.subscribe(()=> {
        console.info('ok')
        this.pinService.subscribe()
      })
    }
  }

  get drawer(){
    return this._drawer;
  }

  bcrt

  constructor(private changeDetectorRef: ChangeDetectorRef, private ref: ElementRef, private renderer: Renderer2, private pinService:PinService) {

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
