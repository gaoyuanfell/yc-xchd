/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:13:45
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-08 17:53:48
 */
import { Directive, OnInit, ElementRef, Optional, Inject, Input } from "@angular/core";
import { StickyStyler } from "@angular/cdk/table";
import { Directionality, Direction } from "@angular/cdk/bidi";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";

@Directive({
  selector: "[sticky]"
})
export class StickyDirective implements OnInit {
  constructor(
    private ref: ElementRef,
    @Optional() protected readonly _dir: Directionality,
    /**
     * @deprecated
     * @breaking-change 8.0.0 `_document` and `_platform` to
     *    be made into a required parameters.
     */
    @Inject(DOCUMENT) _document?: any,
    private _platform?: Platform
  ) {}

  @Input('sticky') sticky: boolean
  @Input('position') position: 'top' | 'bottom'

  _stickyStyler: StickyStyler;
  protected stickyCssClass: string = "moka-table-sticky";

  ngOnInit() {
    this._setupStickyStyler();

    setTimeout(() => {
      let trs = <HTMLElement>this.ref.nativeElement
      let stickyStartStates = []
      for (const tr of Array.from(trs.children)) {
        stickyStartStates.push(tr.hasAttribute('stickyStart'));
      }
      this._stickyStyler.updateStickyColumns([<HTMLElement>this.ref.nativeElement], stickyStartStates, [])
    }, 150);
    // this._stickyStyler.stickRows([<HTMLElement>this.ref.nativeElement], [this.sticky], this.position)

    // let stickyRef: HTMLElement = this.ref.nativeElement;
    // this.compileNode(stickyRef);
  }

  private _setupStickyStyler(){
    const direction: Direction = this._dir ? this._dir.value : "ltr";
    this._stickyStyler = new StickyStyler(
      true,
      this.stickyCssClass,
      direction,
      // @breaking-change 8.0.0 remove the null check for `this._platform`.
      this._platform ? this._platform.isBrowser : true
    );
  }

  compileNode(node: Node) {
    let nodeName = node.nodeName;
    switch (nodeName) {
      case "TR":
        (<HTMLTableRowElement>node).childNodes.forEach(item => {
          this.compileNode(item);
        });
        break;
      case "TH":
        break;
      case "TD":
        break;
    }
  }
}
