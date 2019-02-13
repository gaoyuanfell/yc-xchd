import {
  Directive,
  OnDestroy,
  OnInit,
  Input,
  Host,
  Optional,
  ElementRef,
  Renderer2,
  AfterContentInit
} from "@angular/core";
import { MokaScrollComponent } from 'src/app/core/moka-scroll/moka-scroll.component';
import { fromEvent } from 'rxjs';

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
  private _direction: 'top' | 'bottom' = 'top';



  constructor( @Host() @Optional() private _mokaScrollComponent: MokaScrollComponent, private ref: ElementRef, private renderer:Renderer2 ) {

  }

  ngAfterContentInit() {

    let offsetWidth = (<HTMLDivElement>this.ref.nativeElement).offsetWidth
    setTimeout(() => {
      let bcrt = this.bcrt = (<HTMLDivElement>this._mokaScrollComponent.ref.nativeElement).getBoundingClientRect();
      // console.info(bcrt);

      let bcrt2 = this.bcrt2 = (<HTMLDivElement>this.ref.nativeElement).getBoundingClientRect();
      // console.info(bcrt2);
      this.renderer.setStyle(this.ref.nativeElement, 'width', `${bcrt2.width}px`)
      this.renderer.setStyle(this.ref.nativeElement, 'height', `${bcrt2.height}px`);
    }, 0);

    fromEvent(this._mokaScrollComponent.ref.nativeElement, 'scroll').subscribe(this.scrollEvent.bind(this))
  }

  bcrt

  bcrt2

  div

  scrollEvent(event){
    switch (this.direction){
      case 'top':
        this.top(event.target);
      break;
      case 'bottom':
        this.bottom(event.target);
      break;
    }
  }

  bottom(target){
    console.info(this.bcrt);
    console.info(this.bcrt2);
    console.info(this.bcrt2.bottom - target.scrollTop - this.bcrt.height);
  }

  top(target){
    let top = 0;
    if(this.attach){
      let asd = this.attach.getBoundingClientRect()
      top = asd.top - this.bcrt.top + asd.height
    }

    // console.info(this.bcrt2.top - this.bcrt.top - target.scrollTop)

    if((this.bcrt2.top - this.bcrt.top - target.scrollTop - top) < 0){
      if(this.ref.nativeElement.nodeName == 'TR'){
        Array.from(this.ref.nativeElement.children).forEach((ele)=> {
          this.renderer.setStyle(ele, 'position', `sticky`);
          this.renderer.setStyle(ele, 'top', `${top}px`);
          this.renderer.setStyle(ele, 'z-index', `2`);
        })
        return;
      }

      this.renderer.setStyle(this.ref.nativeElement, 'position', `absolute`);
      this.renderer.setStyle(this.ref.nativeElement, 'top', `${top}px`);
      this.renderer.setStyle(this.ref.nativeElement, 'z-index', `1`);
      if(!this.div){
        this.div = document.createElement('div');
        this.renderer.setStyle(this.div, 'width', `${this.bcrt2.width}px`);
        this.renderer.setStyle(this.div, 'height', `${this.bcrt2.height}px`);
        (<HTMLDivElement>this.ref.nativeElement).parentNode.insertBefore(this.div, this.ref.nativeElement)
      }
    }else{
      this.renderer.removeStyle(this.ref.nativeElement, 'position')
      this.renderer.removeStyle(this.ref.nativeElement, 'top')
      this.renderer.removeStyle(this.ref.nativeElement, 'z-index')
      if(this.div){
        (<HTMLDivElement>this.ref.nativeElement).parentNode.removeChild(this.div)
        this.div = null;
      }
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {}
}
