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
    setTimeout(() => {
      this.bcrt = (<HTMLDivElement>this._mokaScrollComponent.ref.nativeElement).getBoundingClientRect();
      this.bcrt2 = (<HTMLDivElement>this.ref.nativeElement).getBoundingClientRect();
      this.renderer.setStyle(this.ref.nativeElement, 'width', `${this.bcrt2.width}px`)
      this.renderer.setStyle(this.ref.nativeElement, 'height', `${this.bcrt2.height}px`);

      switch (this.direction){
        case 'top':
          this.top();
        break;
        case 'bottom':
          this.bottom();
        break;
      }

    }, 0);
    fromEvent(this._mokaScrollComponent.ref.nativeElement, 'scroll').subscribe(this.scrollEvent.bind(this))

    fromEvent(window, 'resize').subscribe(() => {
      this.renderer.removeStyle(this.ref.nativeElement, 'width');
      this.renderer.removeStyle(this.ref.nativeElement, 'height');
      this.bcrt = (<HTMLDivElement>this._mokaScrollComponent.ref.nativeElement).getBoundingClientRect();
      this.bcrt2 = (<HTMLDivElement>this.ref.nativeElement).getBoundingClientRect();
      if(this.div){
        this.renderer.removeStyle(this.div, 'width');
        this.bcrt2 = (<HTMLDivElement>this.div).getBoundingClientRect();
      }
      this.renderer.setStyle(this.ref.nativeElement, 'width', `${this.bcrt2.width}px`);
      this.renderer.setStyle(this.ref.nativeElement, 'height', `${this.bcrt2.height}px`);

      switch (this.direction){
        case 'top':
          this.top();
        break;
        case 'bottom':
          this.bottom();
        break;
      }
    })
  }

  bcrt

  bcrt2

  div

  scrollTop = 0

  scrollEvent(event){
    this.scrollTop = event.target.scrollTop
    switch (this.direction){
      case 'top':
        this.top();
      break;
      case 'bottom':
        this.bottom();
      break;
    }
  }

  bottom(){
    let bottom = 0;
    if(this.attach){
      let asd = this.attach.getBoundingClientRect()
      bottom = this.bcrt2.bottom - asd.bottom + asd.height
    }

    if((this.bcrt2.bottom - this.bcrt.bottom - this.scrollTop + bottom) >= 0){
      if(this.ref.nativeElement.nodeName == 'TR'){
        Array.from(this.ref.nativeElement.children).forEach((ele)=> {
          this.renderer.setStyle(ele, 'position', `sticky`);
          this.renderer.setStyle(ele, 'bottom', `${bottom}px`);
          this.renderer.setStyle(ele, 'z-index', `2`);
        })
        return;
      }
      this.renderer.setStyle(this.ref.nativeElement, 'position', `absolute`);
      this.renderer.setStyle(this.ref.nativeElement, 'bottom', `${bottom}px`);
      this.renderer.setStyle(this.ref.nativeElement, 'z-index', `1`);
      if(!this.div){
        this.div = document.createElement('div');
        (<HTMLDivElement>this.ref.nativeElement).parentNode.insertBefore(this.div, this.ref.nativeElement)
      }
      console.info(this.bcrt2)
      this.renderer.setStyle(this.div, 'width', `${this.bcrt2.width}px`);
      this.renderer.setStyle(this.div, 'height', `${this.bcrt2.height}px`);

    }else{
      if(this.ref.nativeElement.nodeName == 'TR'){
        Array.from(this.ref.nativeElement.children).forEach((ele)=> {
          this.renderer.removeStyle(ele, 'position');
          this.renderer.removeStyle(ele, 'bottom');
          this.renderer.removeStyle(ele, 'z-index');
        })
        return;
      }
      this.renderer.removeStyle(this.ref.nativeElement, 'position')
      this.renderer.removeStyle(this.ref.nativeElement, 'bottom')
      this.renderer.removeStyle(this.ref.nativeElement, 'z-index')
      if(this.div){
        (<HTMLDivElement>this.ref.nativeElement).parentNode.removeChild(this.div)
        this.div = null;
      }
    }
  }

  top(){
    let top = 0;
    if(this.attach){
      let asd = this.attach.getBoundingClientRect()
      top = asd.top - this.bcrt.top + asd.height
    }

    if((this.bcrt2.top - this.bcrt.top - this.scrollTop - top) <= 0){
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
        (<HTMLDivElement>this.ref.nativeElement).parentNode.insertBefore(this.div, this.ref.nativeElement)
      }
      this.renderer.setStyle(this.div, 'width', `${this.bcrt2.width}px`);
      this.renderer.setStyle(this.div, 'height', `${this.bcrt2.height}px`);
    }else{
      if(this.ref.nativeElement.nodeName == 'TR'){
        Array.from(this.ref.nativeElement.children).forEach((ele)=> {
          this.renderer.removeStyle(ele, 'position');
          this.renderer.removeStyle(ele, 'bottom');
          this.renderer.removeStyle(ele, 'z-index');
        })
        return;
      }
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
