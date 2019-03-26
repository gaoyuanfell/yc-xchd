import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

export interface RGBA {
  r: any
  g: any
  b: any
  a?: any
}

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerComponent implements AfterViewInit, OnDestroy {

  @ViewChild('colorSvpanel') colorSvpanelRef: ElementRef;
  @ViewChild('colorCursor') colorCursorRef: ElementRef;
  @ViewChild('colorSilderBar') colorSilderBarRef: ElementRef;
  @ViewChild('colorSilderThumb') colorSilderThumbRef: ElementRef;
  @ViewChild('colorAlphaSilderBar') colorAlphaSilderBarRef: ElementRef;
  @ViewChild('colorAlphaSilderThumb') colorAlphaSilderThumbRef: ElementRef;

  constructor(private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {

  }

  private alpha = 1

  svpanelRGBAStyle;
  alphaRGBAStyle;
  value = `rgba(0,17,255,0.54)`

  private cycleRatio = 0;

  private position = { top: 0, left: 0 };

  ngAfterViewInit() {
    // 颜色选择板
    let colorSvpanelRef = this.colorSvpanelRef.nativeElement as HTMLDivElement
    let colorCursorRef = this.colorCursorRef.nativeElement as HTMLDivElement
    let svpanelW = colorSvpanelRef.clientWidth;
    let svpanelH = colorSvpanelRef.clientHeight;

    let colorSvpanelSubject = this.silderBarAndThumb(colorSvpanelRef, colorCursorRef)
    colorSvpanelSubject.pipe(
      map((position) => {
        this.position = position
        let s = position.left / svpanelW;
        let v = (svpanelH - position.top) / svpanelH;
        return this.hsv2rgb(s, v);
      })
    ).subscribe(result => {
      this.alphaRGBAStyle = {
        background: `linear-gradient(to right, rgba(${result[0]},${result[1]},${result[2]},${0}) 0%, rgba(${result[0]},${result[1]},${result[2]},${1}) 100%)`
      }
      this.value = `rgba(${result[0]},${result[1]},${result[2]},${this.alpha})`
      this.changeDetectorRef.markForCheck()
    })

    // 颜色滑块
    let colorSilderBarRef = this.colorSilderBarRef.nativeElement as HTMLDivElement
    let colorSilderThumbRef = this.colorSilderThumbRef.nativeElement as HTMLDivElement
    let colorSilderBarH = colorSilderBarRef.clientHeight;

    let colorSilderBarSubject = this.silderBarAndThumb(colorSilderBarRef, colorSilderThumbRef, ['x'])
    colorSilderBarSubject.pipe(
      map((position) => {
        this.cycleRatio = position.top / colorSilderBarH * 360;
        colorSvpanelSubject.next(this.position)
        return this.hsv2rgb(1, 1);
      })
    ).subscribe(result => {
      this.svpanelRGBAStyle = {
        background: `rgba(${result[0]},${result[1]},${result[2]},${1})`
      }
      this.changeDetectorRef.markForCheck()
    })

    // 透明度
    let colorAlphaSilderBarRef = this.colorAlphaSilderBarRef.nativeElement as HTMLDivElement
    let colorAlphaSilderThumbRef = this.colorAlphaSilderThumbRef.nativeElement as HTMLDivElement
    let colorAlphaSilderBarW = colorAlphaSilderBarRef.clientWidth;

    let colorAlphaSilderBarSubject = this.silderBarAndThumb(colorAlphaSilderBarRef, colorAlphaSilderThumbRef, ['y'])
    colorAlphaSilderBarSubject.pipe(
      map((position) => {
        return Math.round((1 / colorAlphaSilderBarW * position.left) * 100) / 100
      })
    ).subscribe(result => {
      this.alpha = result
      colorSvpanelSubject.next(this.position)
    })

    if (this.value) {
      let rgba = this.value.match(/(\d\.?)+/ig)
      if (rgba.length >= 3) {
        let result = this.rgb2hsv(rgba)
        let positions = this.hsv2Position(result)
        colorSilderBarSubject.next(positions[0])
        colorAlphaSilderBarSubject.next(positions[1])
        colorSvpanelSubject.next(positions[2])
      }
    }
  }

  hsv2rgb(s, v) {
    let R, G, B, X, C;
    let h = (this.cycleRatio % 360) / 60;

    C = v * s;
    X = C * (1 - Math.abs(h % 2 - 1));
    R = G = B = v - C;

    h = ~~h;
    R += [C, X, 0, 0, X, C][h];
    G += [X, C, C, X, 0, 0][h];
    B += [0, 0, X, C, C, X][h];

    let _r = Math.floor(R * 255);
    let _g = Math.floor(G * 255);
    let _b = Math.floor(B * 255);
    return [_r, _g, _b]
  }

  rgb2hsv(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let A = rgb[3];
    if (r > 1 || g > 1 || b > 1) {
      r /= 255;
      g /= 255;
      b /= 255;
    }
    let H, S, V, C;
    V = Math.max(r, g, b);
    C = V - Math.min(r, g, b);
    H = (C == 0 ? null :
      V == r ? (g - b) / C + (g < b ? 6 : 0) :
        V == g ? (b - r) / C + 2 :
          (r - g) / C + 4);
    H = (H % 6) * 60;
    S = C == 0 ? 0 : C / V;
    return { h: H, s: S, v: V, a: A };
  }

  hsv2Position(hsv){
    let positions = []

    let {h,s,v,a} = hsv
    let colorSilderBarRef = this.colorSilderBarRef.nativeElement as HTMLDivElement
    let colorSilderThumb = this.colorSilderThumbRef.nativeElement as HTMLDivElement
    let colorSilderBarH = colorSilderBarRef.clientHeight;
    let colorSilderThumbW = colorSilderThumb.offsetWidth;
    let position = {
      top: h * colorSilderBarH / 360, left: colorSilderThumbW / 2
    }
    this.setRefPosition(this.colorSilderThumbRef.nativeElement, position)
    positions.push(position)

    let colorAlphaSilderBarRef = this.colorAlphaSilderBarRef.nativeElement as HTMLDivElement
    let colorAlphaSilderThumbRef = this.colorAlphaSilderThumbRef.nativeElement as HTMLDivElement
    let colorAlphaSilderBarW = colorAlphaSilderBarRef.clientWidth;
    let colorAlphaSilderThumbH = colorAlphaSilderThumbRef.offsetHeight;
    let position2 = {
      top: colorAlphaSilderThumbH / 2, left: colorAlphaSilderBarW * (a || 1)
    }
    this.setRefPosition(this.colorAlphaSilderThumbRef.nativeElement, position2)
    positions.push(position2)

    let colorSvpanelRef = this.colorSvpanelRef.nativeElement as HTMLDivElement
    let svpanelW = colorSvpanelRef.clientWidth;
    let svpanelH = colorSvpanelRef.clientHeight;
    let position3 = {
      top: svpanelH - v * svpanelH,
      left: s * svpanelW
    }
    this.setRefPosition(this.colorCursorRef.nativeElement, position3)
    positions.push(position3)
    return positions
  }

  silderBarAndThumb(bar, thumb, rangeBo = []) {
    let subject = new Subject<any>()
    fromEvent(bar, 'mousedown').pipe(
      switchMap(() => {
        return fromEvent(window, 'mousemove').pipe(
          map((event: MouseEvent) => {
            return this.getRefPosition(bar, thumb, event, rangeBo)
          }),
          takeUntil(fromEvent(window, 'mouseup'))
        )
      })
    ).subscribe(position => {
      this.setRefPosition(thumb, position)
      subject.next(position)
    })

    fromEvent(bar, 'mousedown').pipe(
      switchMap(() => {
        return fromEvent(window, 'mouseup').pipe(
          map((event: MouseEvent) => {
            return this.getRefPosition(bar, thumb, event, rangeBo)
          }),
          takeUntil(fromEvent(window, 'mousemove'))
        )
      })
    ).subscribe(position => {
      this.setRefPosition(thumb, position)
      subject.next(position)
    })
    return subject
  }

  getRefPosition(ref, ref2, event: MouseEvent, rangeBo) {
    let { pageX, pageY } = event;
    let bcrt = ref.getBoundingClientRect()
    let bcrt2 = ref2.getBoundingClientRect()
    let left = pageX - bcrt.left;
    let top = pageY - bcrt.top;
    let rangeW = 0
    let rangeH = 0
    let range2W = bcrt.width
    let range2H = bcrt.height
    let _x = rangeBo.indexOf('x');
    let _y = rangeBo.indexOf('y');
    if (!!~_x) {
      rangeW = rangeW + bcrt2.width / 2
      range2W = range2W - bcrt2.width / 2
    }
    if (!!~_y) {
      rangeH = rangeH + bcrt2.height / 2
      range2H = range2H - bcrt2.height / 2
    }
    if (left <= rangeW) left = rangeW
    if (top <= rangeH) top = rangeH
    if (left >= range2W) left = range2W
    if (top >= range2H) top = range2H
    return {
      left: left,
      top: top
    }
  }

  setRefPosition(ref, position) {
    let p = { ...position }
    let bcrt = ref.getBoundingClientRect()
    let keys = Object.keys(p)
    p.left = p.left - bcrt.width / 2
    p.top = p.top - bcrt.height / 2
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = p[key];
      this.renderer.setStyle(ref, key, `${value}px`)
    }
  }

  ngOnDestroy() {

  }
}
