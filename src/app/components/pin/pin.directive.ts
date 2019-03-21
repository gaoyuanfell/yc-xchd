/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:56
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-21 18:00:10
 */
import { AfterViewChecked, Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, Renderer2 } from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { MokaScrollComponent } from "src/app/core/moka-scroll/moka-scroll.component";
import { MokaTableComponent } from 'src/app/core/moka-table/moka-table.component';

@Directive({
  selector: "[pin]"
})
export class PinDirective implements OnInit, OnDestroy, AfterViewChecked {
  @Input() set scroll(val) {
    this._scroll = val;
  }
  get scroll() {
    return this._scroll;
  }
  private _scroll;

  @Input() set attach(val) {
    this._attach = val;
  }
  get attach(): HTMLDivElement {
    return this._attach;
  }
  private _attach;

  @Input() set direction(val) {
    this._direction = val;
  }
  get direction() {
    return this._direction;
  }
  private _direction: "top" | "bottom" = "top";

  constructor(
    @Host() @Optional() private _mokaScrollComponent: MokaScrollComponent,
    @Host() @Optional() private mokaTableComponent: MokaTableComponent,
    public ref: ElementRef,
    private renderer: Renderer2,
  ) {
    this.ngUnsubscribe = new Subject<any>()
    this.mokaTableComponent.pinDirectives.push(this)
  }

  time = 150;

  avatarBox;

  private isInitAvatarBox = false
  initAvatarBox() {
    if (!this._mokaScrollComponent) return;
    if (!this.avatarBox) {
      this.avatarBox = document.createElement("div");
      (<HTMLDivElement>this.ref.nativeElement).parentNode.insertBefore(
        this.avatarBox,
        this.ref.nativeElement
      );
    }
    this.avatarBox.appendChild(this.ref.nativeElement);
    this.addStyle();
    this.originalScrollTop = this._mokaScrollComponent.ref.nativeElement.scrollTop;
    this.originalBcrt = this.ref.nativeElement.getBoundingClientRect();
    if (this.attach) {
      this.originalAttachBcrt = this.attach.getBoundingClientRect();
    }
    this.position(this.scrollTop || 0);
  }

  private subscribeDefChange = false;
  subscribeChange() {
    if (!this.avatarBox) return;
    this.subscribeDefChange = true;
  }

  implementSubscribeChange() {
    this.originalScrollTop = this._mokaScrollComponent.ref.nativeElement.scrollTop;
    this.removeStyle();
    this.originalBcrt = this.ref.nativeElement.getBoundingClientRect();
    if (this.attach) {
      this.originalAttachBcrt = this.attach.getBoundingClientRect();
    }
    this.addStyle();
    this.position(this.scrollTop || 0);
  }

  addStyle() {
    this.renderer.setStyle(this.ref.nativeElement, "position", "relative"); //  sticky relative
    this.renderer.setStyle(this.ref.nativeElement, "z-index", "100000");
  }

  removeStyle() {
    this.renderer.removeStyle(this.ref.nativeElement, "position");
    this.renderer.removeStyle(this.ref.nativeElement, "top");
    this.renderer.removeStyle(this.ref.nativeElement, "bottom");
    this.renderer.removeStyle(this.ref.nativeElement, "z-index");
  }

  originalBcrt: ClientRect | DOMRect;
  originalAttachBcrt: ClientRect | DOMRect;
  scrollTop;
  originalScrollTop = 0;

  private ngUnsubscribe: Subject<any>;

  ngOnInit() {
    this.isInitAvatarBox = true;
    fromEvent(
      this._mokaScrollComponent.ref.nativeElement,
      "scroll"
    )
      .pipe(map((event: any) => event.target.scrollTop), takeUntil(this.ngUnsubscribe))
      .subscribe(scrollTop => {
        if (!this.originalBcrt) return;
        this.scrollTop = scrollTop;
        this.position(scrollTop);
      });
  }

  ngAfterViewChecked() {
    if (this.isInitAvatarBox) {
      this.isInitAvatarBox = false;
      this.initAvatarBox();
    }
    if (this.subscribeDefChange) {
      this.subscribeDefChange = false;
      this.implementSubscribeChange()
    }
  }

  position(scrollTop) {
    switch (this.direction) {
      case "top": {
        this.top(scrollTop);
      }
      case "bottom": {
        this.bottom(scrollTop);
      }
    }
  }

  top(scrollTop) {
    let bcrt = this._mokaScrollComponent.ref.nativeElement.getBoundingClientRect();
    let top = bcrt.top;
    if (this.originalAttachBcrt) {
      top = this.originalAttachBcrt.top + this.originalAttachBcrt.height;
    }
    if (this.originalBcrt.top + this.originalScrollTop - top - scrollTop <= 0) {
      this.renderer.setStyle(
        this.ref.nativeElement,
        "top",
        `${scrollTop -
        (this.originalBcrt.top + this.originalScrollTop - top)}px`
      );
    } else {
      this.renderer.removeStyle(this.ref.nativeElement, "top");
    }
  }

  bottom(scrollTop) {
    let bcrt:
      | ClientRect
      | DOMRect = this._mokaScrollComponent.ref.nativeElement.getBoundingClientRect();
    let bottom = bcrt.top + this._mokaScrollComponent.ref.nativeElement.clientHeight; // bcrt.bottom

    if (this.originalAttachBcrt) {
      bottom = bottom - this.originalAttachBcrt.height;
    }
    if (
      this.originalBcrt.bottom + this.originalScrollTop >=
      bottom + scrollTop
    ) {
      this.renderer.setStyle(
        this.ref.nativeElement,
        "bottom",
        `${this.originalBcrt.bottom +
        this.originalScrollTop -
        (bottom + scrollTop)}px`
      );
    } else {
      this.renderer.removeStyle(this.ref.nativeElement, "bottom");
    }
  }

  ngOnDestroy() {
    this.avatarBox = undefined;
    this.originalBcrt = undefined;
    this.originalAttachBcrt = undefined;
    this.scrollTop = 0;
    this.originalScrollTop = 0;

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
