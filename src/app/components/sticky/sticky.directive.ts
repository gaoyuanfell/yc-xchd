/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:13:45
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-21 16:20:13
 */
import { Direction, Directionality } from "@angular/cdk/bidi";
import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { AfterViewChecked, ChangeDetectorRef, Directive, ElementRef, Host, Inject, Input, OnInit, Optional } from "@angular/core";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MokaScrollComponent } from 'src/app/core/moka-scroll/moka-scroll.component';
import { MokaTableComponent } from 'src/app/core/moka-table/moka-table.component';
import { MokaStickyStyler } from './moka-sticky-styler';

@Directive({
  selector: "[sticky]"
})
export class StickyDirective implements OnInit, AfterViewChecked {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Host() @Optional() private mokaTableComponent: MokaTableComponent,
    @Host() @Optional() private mokaScrollComponent: MokaScrollComponent,
    private ref: ElementRef,
    @Optional() protected readonly _dir: Directionality,
    /**
     * @deprecated
     * @breaking-change 8.0.0 `_document` and `_platform` to
     *    be made into a required parameters.
     */
    @Inject(DOCUMENT) _document?: any,
    private _platform?: Platform,
  ) {
    this.mokaTableComponent.stickyDirectives.push(this)
  }

  @Input('sticky') sticky: boolean
  @Input('position') position: 'top' | 'bottom' | 'left' | any

  _stickyStyler: MokaStickyStyler;
  protected stickyCssClass: string = "moka-table-sticky";

  ngOnInit() {
    this.subscribeDef.pipe(debounceTime(0)).subscribe(()=> {
      this.subscribeDefChange = true;
      this.changeDetectorRef.markForCheck()
    })
  }

  private _setupStickyStyler() {
    if(this._stickyStyler) return;
    const direction: Direction = this._dir ? this._dir.value : "ltr";
    this._stickyStyler = new MokaStickyStyler(
      true,
      this.stickyCssClass,
      direction,
      // @breaking-change 8.0.0 remove the null check for `this._platform`.
      this._platform ? this._platform.isBrowser : true,
      this.mokaTableComponent,
      this.mokaScrollComponent,
    );
  }

  private subscribeDef = new Subject<any>();
  subscribeChange(){
    this.subscribeDef.next()
  }

  private subscribeDefChange = false;
  implementSubscribeChange(){
    let rows = <HTMLElement>this.ref.nativeElement;
    const stickyStartStates = Array.from(rows.children).map(column => column.hasAttribute('stickyStart'))
    const stickyEndStates = Array.from(rows.children).map(column => column.hasAttribute('stickyEnd'))

    switch (this.position) {
      case 'top':
      case 'bottom':
        this._stickyStyler.clearStickyPositioning([rows], ['top', 'bottom','left', 'right'])
        this._stickyStyler.stickRows([rows], [this.sticky], this.position)
        this._stickyStyler.updateStickyColumns([rows], stickyStartStates, stickyEndStates)
        break
      case 'left':
        this._stickyStyler.clearStickyPositioning([rows], ['left', 'right'])
        this._stickyStyler.updateStickyColumns([rows], stickyStartStates, stickyEndStates)
        break
    }
  }

  ngAfterViewChecked() {
    if(this.subscribeDefChange){
      // console.info('bb')
      this.subscribeDefChange = false;
      this._setupStickyStyler();
      this.implementSubscribeChange();
    }
  }
}
