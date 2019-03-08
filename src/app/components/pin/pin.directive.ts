import {
  Directive,
  OnDestroy,
  OnInit,
  Input,
  Host,
  Optional,
  ElementRef,
  Renderer2,
  AfterContentInit,
} from "@angular/core";
import { MokaScrollComponent } from "src/app/core/moka-scroll/moka-scroll.component";
import { fromEvent, Observable } from "rxjs";
import { map, debounceTime } from "rxjs/operators";
import { PinService } from "./pin.service";

@Directive({
  selector: "[pin]"
})
export class PinDirective implements OnInit, OnDestroy, AfterContentInit {
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
    private ref: ElementRef,
    private renderer: Renderer2,
    private pinService: PinService
  ) {
    pinService.add(this);
  }


  avatarBox;

  initAvatarNum
  initAvatarBox() {
    if (!this.avatarBox) {
      this.avatarBox = document.createElement("div");
      (<HTMLDivElement>this.ref.nativeElement).parentNode.insertBefore(
        this.avatarBox,
        this.ref.nativeElement
      );
    }
    this.avatarBox.appendChild(this.ref.nativeElement);
    this.addStyle();
    this.initAvatarNum = setTimeout(() => {
      this.originalBcrt = this.ref.nativeElement.getBoundingClientRect();
      if (this.attach) {
        this.originalAttachBcrt = this.attach.getBoundingClientRect();
      }
      this.position(this.scrollTop || 0);
    }, 150);
  }

  private subscribeNumber
  subscribeChange() {
    if (!this.avatarBox) return;
    if(this.subscribeNumber) clearTimeout(this.subscribeNumber);
    this.originalScrollTop = this._mokaScrollComponent.ref.nativeElement.scrollTop;
    this.subscribeNumber = setTimeout(() => {
      this.removeStyle();
      this.originalBcrt = this.ref.nativeElement.getBoundingClientRect();
      if (this.attach) {
        this.originalAttachBcrt = this.attach.getBoundingClientRect();
      }
      this.addStyle();
      this.position(this.scrollTop || 0);
    }, 150);
  }

  addStyle() {
    this.renderer.setStyle(this.ref.nativeElement, "position", "relative");
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

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.initAvatarBox();
    fromEvent(this._mokaScrollComponent.ref.nativeElement, "scroll")
      .pipe(map((event: any) => event.target.scrollTop))
      .subscribe(scrollTop => {
        if (!this.originalBcrt) return;
        this.scrollTop = scrollTop;
        this.position(scrollTop);
      });
    let resizeEvent: Observable<any> = fromEvent(window, "resize")
    resizeEvent.subscribe(()=> {
      this.position(this.scrollTop || 0);
    })
    resizeEvent.pipe(debounceTime(100)).subscribe(()=> {
      this.subscribeChange()
    })
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
    let bottom = bcrt.bottom;
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
    this.pinService.remove(this);
  }
}
