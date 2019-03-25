import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerComponent implements AfterViewInit {

  @ViewChild('colorSvpanel') colorSvpanelRef: ElementRef;
  @ViewChild('colorCursor') colorCursorRef: ElementRef;
  @ViewChild('colorSilderBar') colorSilderBarRef: ElementRef;
  @ViewChild('colorSilderThumb') colorSilderThumbRef: ElementRef;

  constructor(private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    let colorSvpanelRef = this.colorSvpanelRef.nativeElement as HTMLDivElement
    let colorCursorRef = this.colorCursorRef.nativeElement as HTMLDivElement
    fromEvent(colorSvpanelRef, 'mousedown').pipe(
      switchMap(() => {
        return fromEvent(window, 'mousemove').pipe(
          map((event: MouseEvent) => {
            return this.getRefPosition(colorSvpanelRef, colorCursorRef, event)
          }),
          takeUntil(fromEvent(window, 'mouseup'))
        )
      })
    ).subscribe(position => {
      this.setRefPosition(colorCursorRef, position)
    })

    fromEvent(colorSvpanelRef, 'mousedown').pipe(
      switchMap(() => {
        return fromEvent(window, 'mouseup').pipe(
          map((event: MouseEvent) => {
            return this.getRefPosition(colorSvpanelRef, colorCursorRef, event)
          }),
          takeUntil(fromEvent(window, 'mousemove'))
        )
      }),
    ).subscribe(position => {
      this.setRefPosition(colorCursorRef, position)
    })


    let colorSilderBarRef = this.colorSilderBarRef.nativeElement as HTMLDivElement
    let colorSilderThumbRef = this.colorSilderThumbRef.nativeElement as HTMLDivElement

    fromEvent(colorSilderBarRef, 'mousedown').pipe(
      switchMap(() => {
        return fromEvent(window, 'mousemove').pipe(
          map((event: MouseEvent) => {
            return this.getRefPosition(colorSilderBarRef, colorSilderThumbRef, event, false)
          }),
          takeUntil(fromEvent(window, 'mouseup'))
        )
      })
    ).subscribe(position => {
      this.setRefPosition(colorSilderThumbRef, position)
    })

    fromEvent(colorSilderBarRef, 'mousedown').pipe(
      switchMap(() => {
        return fromEvent(window, 'mouseup').pipe(
          map((event: MouseEvent) => {
            return this.getRefPosition(colorSilderBarRef, colorSilderThumbRef, event, false)
          }),
          takeUntil(fromEvent(window, 'mousemove'))
        )
      })
    ).subscribe(position => {
      this.setRefPosition(colorSilderThumbRef, position)
    })
  }

  getRefPosition(ref, ref2, event: MouseEvent, rangeBo = false) {
    let { pageX, pageY } = event;
    let bcrt = ref.getBoundingClientRect()
    let bcrt2 = ref2.getBoundingClientRect()

    if(rangeBo){
      let rangeW = - bcrt2.width / 2;
      let rangeH = - bcrt2.height / 2;
      let left = pageX - bcrt.left - bcrt2.width / 2; //  - bcrt2.width / 2
      let top = pageY - bcrt.top - bcrt2.height / 2; //  - bcrt2.height / 2
      if (left <= rangeH) left = rangeH
      if (top <= rangeH) top = rangeH
      if (left >= bcrt.width + rangeW) left = bcrt.width + rangeW
      if (top >= bcrt.height + rangeH) top = bcrt.height + rangeH
      return {
        left: left,
        top: top
      }
    }else{
      let rangeW = - bcrt2.width;
      let rangeH = - bcrt2.height;
      let left = pageX - bcrt.left - bcrt2.width / 2;
      let top = pageY - bcrt.top - bcrt2.height / 2;
      if (left <= 0) left = 0
      if (top <= 0) top = 0
      if (left >= bcrt.width + rangeW) left = bcrt.width + rangeW
      if (top >= bcrt.height + rangeH) top = bcrt.height + rangeH
      return {
        left: left,
        top: top
      }
    }
  }

  setRefPosition(ref, position) {
    let keys = Object.keys(position)
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = position[key];
      this.renderer.setStyle(ref, key, `${value}px`)
    }
  }

}
