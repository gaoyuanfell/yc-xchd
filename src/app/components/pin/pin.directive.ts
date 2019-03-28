/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:56
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-28 10:05:26
 */
import { AfterViewInit, Directive, ElementRef, Host, Input, OnInit, Optional, Renderer2 } from "@angular/core";
import { MokaTableComponent } from 'src/app/core/moka-table/moka-table.component';

@Directive({
  selector: "[pin]",
  exportAs: 'pin'
})
export class PinDirective implements OnInit, AfterViewInit {

  @Input() set attach(val) {
    this._attach = val;
  }
  get attach(): PinDirective {
    return this._attach;
  }
  private _attach: PinDirective;

  @Input() set direction(val) {
    this._direction = val;
  }
  get direction() {
    return this._direction;
  }
  private _direction: "top" | "bottom" = "top";

  position() {
    switch (this.direction) {
      case "top": {
        this.top();
        break;
      }
      case "bottom": {
        this.bottom();
        break;
      }
    }
  }

  top() {
    let top = 0;
    if (this.attach) {
      let attach = this.attach;
      while (attach) {
        top = top + attach.ref.nativeElement.clientHeight
        attach = attach.attach
      }
    }
    this.renderer.setStyle(this.ref.nativeElement, "top", `${top}px`);
  }

  bottom() {
    let bottom = 0;
    if (this.attach) {
      let attach = this.attach;
      while (attach) {
        bottom = bottom + attach.ref.nativeElement.clientHeight
        attach = attach.attach
      }
    }
    this.renderer.setStyle(this.ref.nativeElement, "bottom", `${bottom}px`);
  }

  addStyle() {
    this.renderer.setStyle(this.ref.nativeElement, "position", "sticky"); //  sticky relative
    this.renderer.setStyle(this.ref.nativeElement, "z-index", "100000");
  }

  constructor(public ref: ElementRef,
    private renderer: Renderer2,
    @Host() @Optional() private mokaTableComponent: MokaTableComponent, ) {
    this.mokaTableComponent.pinDirectives.push(this)
  }

  ngOnInit() {
    this.addStyle()
    this.position()
  }

  ngAfterViewInit() {

  }
}
