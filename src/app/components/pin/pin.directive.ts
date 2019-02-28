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
import { map } from 'rxjs/operators';

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

  constructor(@Host() @Optional() private _mokaScrollComponent: MokaScrollComponent, private ref: ElementRef,private renderer:Renderer2){
    console.info(_mokaScrollComponent);
    console.info(ref);
  }

  ngAfterContentInit(): void {

  }

  avatarBox

  createAvatarBox(){
    if(!this.avatarBox){
      this.avatarBox = document.createElement('div');
      (<HTMLDivElement>this.ref.nativeElement).parentNode.insertBefore(this.avatarBox, this.ref.nativeElement)
      this.avatarBox.appendChild(this.ref.nativeElement)
      this.renderer.setStyle(this.ref.nativeElement, 'position', 'relative')
    }
  }

  ngOnInit() {
    this.createAvatarBox()
    fromEvent(this._mokaScrollComponent.ref.nativeElement, 'scroll').pipe(map((event:any) => event.target.scrollTop)).subscribe(top => {
      let bcrt = this.ref.nativeElement.getBoundingClientRect()
      let bcrt2 = this._mokaScrollComponent.ref.nativeElement.getBoundingClientRect()
      console.info(top)
      console.info(bcrt.top)
      console.info(bcrt2.top)
      if(bcrt2.top - top <= 0){

      }
      // if(bcrt.top <= bcrt2.top){
      //   console.info('ok')
      //   this.renderer.setStyle(this.ref.nativeElement, 'top', `${top - bcrt2.top}px`)
      // }

      // this.renderer.setStyle(this.ref.nativeElement, 'top', `${top - bcrt2.top}px`)
      // if(bcrt.top - bcrt2.top <= 0){
      //   this.renderer.setStyle(this.ref.nativeElement, 'top', `${top - bcrt2.top}px`)
      // }else{
      //   this.renderer.removeStyle(this.ref.nativeElement, 'top')
      // }
      // console.info(bcrt.top - bcrt2.top)

    })
  }

  ngOnDestroy() {}
}
