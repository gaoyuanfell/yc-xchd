import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, Output, Renderer2, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerComponent implements OnDestroy, OnInit {

  @ViewChild('colorSvpanel') colorSvpanelRef: ElementRef;
  @ViewChild('colorCursor') colorCursorRef: ElementRef;
  @ViewChild('colorSilderBar') colorSilderBarRef: ElementRef;
  @ViewChild('colorSilderThumb') colorSilderThumbRef: ElementRef;
  @ViewChild('colorAlphaSilderBar') colorAlphaSilderBarRef: ElementRef;
  @ViewChild('colorAlphaSilderThumb') colorAlphaSilderThumbRef: ElementRef;

  constructor(private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {

  }

  private alpha = 1 // 透明度

  private unsubscribe = new Subject<any>();
  private colorSvpanelSubject:Subject<any>
  private colorSilderBarSubject:Subject<any>
  private colorAlphaSilderBarSubject:Subject<any>

  value;
  svpanelRGBAStyle
  alphaRGBAStyle
  private cycleRatio = 0; // 滑块高比
  private position = { top: 0, left: 0 };

  confirm(){
    this.close.emit(this.value)
  }

  cancel(){
    this.close.emit()
  }

  @Output() close = new EventEmitter<any>();

  ngOnInit() {
    // 颜色选择板
    let colorSvpanelRef = this.colorSvpanelRef.nativeElement as HTMLDivElement
    let colorCursorRef = this.colorCursorRef.nativeElement as HTMLDivElement
    let svpanelW = colorSvpanelRef.clientWidth;
    let svpanelH = colorSvpanelRef.clientHeight;

    this.colorSvpanelSubject = this.silderBarAndThumb(colorSvpanelRef, colorCursorRef)
    this.colorSvpanelSubject.pipe(
      map((position) => {
        this.position = position
        let s = position.left / svpanelW;
        let v = (svpanelH - position.top) / svpanelH;
        return this.hsv2rgb(s, v);
      }),
      takeUntil(this.unsubscribe)
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

    this.colorSilderBarSubject = this.silderBarAndThumb(colorSilderBarRef, colorSilderThumbRef, ['x'])
    this.colorSilderBarSubject.pipe(
      map((position) => {
        this.cycleRatio = position.top / colorSilderBarH * 360;
        this.colorSvpanelSubject.next(this.position)
        return this.hsv2rgb(1, 1);
      }),
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      this.svpanelRGBAStyle = {
        backgroundColor: `rgba(${result[0]},${result[1]},${result[2]},${1})`
      }
      this.changeDetectorRef.markForCheck()
    })

    // 透明度
    let colorAlphaSilderBarRef = this.colorAlphaSilderBarRef.nativeElement as HTMLDivElement
    let colorAlphaSilderThumbRef = this.colorAlphaSilderThumbRef.nativeElement as HTMLDivElement
    let colorAlphaSilderBarW = colorAlphaSilderBarRef.clientWidth;

    this.colorAlphaSilderBarSubject = this.silderBarAndThumb(colorAlphaSilderBarRef, colorAlphaSilderThumbRef, ['y'])
    this.colorAlphaSilderBarSubject.pipe(
      map((position) => {
        return Math.round((1 / colorAlphaSilderBarW * position.left) * 100) / 100
      }),
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      this.alpha = result
      this.colorSvpanelSubject.next(this.position)
    })

    // 默认值
    if(!this.value || (!this.value.match(/^rgba?\((.*)\)$/) && this.value.substr(0,1) != '#')){
      this.value = `rgba(255,255,255,1)`
      this.changeDetectorRef.markForCheck()
      console.info(this.value)
    }
    this.reductionValue(this.value)
  }

  // 数值还原
  reductionValue(value){
    let result
    let matchs = value.match(/^rgba?\((.*)\)$/)
    let rgba
    if(matchs){
      rgba = matchs[1].split(',')
    }
    if (rgba && rgba.length >= 3) {
      result = this.rgb2hsv(rgba)
    }
    if(value.substr(0,1) == '#'){
      if(value.length == 4) {
        value = `#${value.substr(1,1)}${value.substr(1,1)}${value.substr(2,1)}${value.substr(2,1)}${value.substr(3,1)}${value.substr(3,1)}`
      }
      let rgba = [
        parseInt(value.substr(1, 2), 16),
        parseInt(value.substr(3, 2), 16),
        parseInt(value.substr(5, 2), 16),
        (parseInt(value.substr(7, 2) || 'ff', 16) / 255).toFixed(2),
      ]
      result = this.rgb2hsv(rgba)
    }
    if(!result) return;
    let positions = this.hsv2Position(result)
    this.colorSilderBarSubject.next(positions[0])
    this.colorAlphaSilderBarSubject.next(positions[1])
    this.colorSvpanelSubject.next(positions[2])
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
    return [_r, _g, _b, this.alpha]
  }

  rgb2Hex(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let a = rgb[3];
    let _a = parseInt(String(a * 255)).toString(16);
    if (_a.length == 1) _a = '0' + _a;
    return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1) + _a
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

  // 位置还原
  hsv2Position(hsv) {
    let positions = []

    let { h, s, v, a } = hsv
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

  silderBarAndThumb(bar, thumb, rangeBo = []):Subject<any> {
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
    this.unsubscribe.next()
    this.unsubscribe.complete()
    this.colorSvpanelSubject.complete()
    this.colorSilderBarSubject.complete()
    this.colorAlphaSilderBarSubject.complete()
  }
}
