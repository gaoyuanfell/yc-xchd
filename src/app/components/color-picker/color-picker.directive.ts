import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Inject, InjectionToken, Injector, Optional, ViewContainerRef, ComponentRef, Output, EventEmitter, forwardRef, AfterViewInit } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const MAT_COLOR_PICKER_SCROLL_STRATEGY =
    new InjectionToken<() => ScrollStrategy>('mat-color-picker-scroll-strategy');

export function MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export const MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_COLOR_PICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY,
};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorPickerDirective),
  multi: true
};

@Directive({
  selector: '[colorPicker]',
  providers:[
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ]
})
export class ColorPickerDirective implements ControlValueAccessor{

  _opened
  _overlayRef
  _portal: ComponentPortal<ColorPickerComponent>
  _portalRef: ComponentRef<ColorPickerComponent>
  value
  private _scrollStrategy: () => ScrollStrategy;

  @Output() change = new EventEmitter<any>()

  @HostListener('click')
  opne() {
    if (this._opened) {
      return;
    }
    this._onTouched()

    this._createOverlay();
    this._portalRef = this._overlayRef.attach(this._getPortal());
    this._overlayRef.backdropClick().subscribe(()=> {
      this.close()
    })


    this._portalRef.instance.value = this.value
    this._portalRef.instance.close.subscribe((result)=> {
      this.close()
      if(result) {
        this.value = result
        this.change.emit(result)
        this._onChange(result)
      }
    })
    this._opened = true
  }

  close() {
    if (!this._opened) {
      return;
    }
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._opened = false;
  }

  private _getPortal(){
    if(!this._portal){
      this._portal = new ComponentPortal<ColorPickerComponent>(ColorPickerComponent, this._viewContainerRef, this._injector);
    }
    return this._portal
  }

  private _createOverlay(): OverlayRef {
    if (!this._overlayRef) {
      const config = this._getOverlayConfig();
      this._overlayRef = this._overlay.create(config);
    }
    return this._overlayRef;
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._overlay.position()
      .flexibleConnectedTo(this._element)
      .withTransformOriginOn('.mat-color-picker-content')
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withLockedPosition()
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]).withDefaultOffsetY(1),
      hasBackdrop: true,
      backdropClass: 'mat-overlay-transparent-backdrop',
      panelClass: 'mat-color-picker-popup',
      scrollStrategy: this._scrollStrategy(),
      direction: this._dir
    });
  }

  private _onChange = (value: any) => { };

  private _onTouched = () => { };

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  constructor(private _overlay: Overlay,
    private _element: ElementRef<HTMLElement>,
    private _viewContainerRef: ViewContainerRef,
    private _injector: Injector,
    @Inject(MAT_COLOR_PICKER_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() private _dir: Directionality) {
    this._scrollStrategy = scrollStrategy;
  }



}
