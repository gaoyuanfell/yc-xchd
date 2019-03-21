import { Direction } from '@angular/cdk/bidi';
import { StickyStyler } from '@angular/cdk/table';
import { MokaScrollComponent } from 'src/app/core/moka-scroll/moka-scroll.component';
import { RetainDirective } from '../retain/retain.directive';

export class MokaStickyStyler extends StickyStyler {

  moka_isNativeHtmlTable
  moka_stickCellCss
  moka_direction
  moka_isBrowser

  constructor(isNativeHtmlTable: boolean,
    stickCellCss: string,
    direction: Direction,
    isBrowser = true,
    private retainDirective: RetainDirective,
    private mokaScrollComponent: MokaScrollComponent) {
    super(isNativeHtmlTable, stickCellCss, direction, isBrowser)
    this.moka_isNativeHtmlTable = isNativeHtmlTable
    this.moka_stickCellCss = stickCellCss
    this.moka_direction = direction
    this.moka_isBrowser = isBrowser
  }

  updateStickyColumns(
    rows: HTMLElement[], stickyStartStates: boolean[], stickyEndStates: boolean[]) {
    const hasStickyColumns =
      stickyStartStates.some(state => state) || stickyEndStates.some(state => state);
    if (!rows.length || !hasStickyColumns || !this.moka_isBrowser) {
      return;
    }

    const firstRow = rows[0];
    const numCells = firstRow.children.length;
    const cellWidths: number[] = this._getCellWidths(firstRow);

    let bcrt:ClientRect | DOMRect = firstRow.getBoundingClientRect();

    const startPositions = this._getStickyStartColumnPositions(cellWidths, stickyStartStates, bcrt);
    const endPositions = this._getStickyEndColumnPositions(cellWidths, stickyEndStates, bcrt);
    const isRtl = this.direction === 'rtl';

    for (const row of rows) {
      for (let i = 0; i < numCells; i++) {
        const cell = row.children[i] as HTMLElement;
        if (stickyStartStates[i]) {
          this._addStickyStyle(cell, isRtl ? 'right' : 'left', startPositions[i]);
        }

        if (stickyEndStates[i]) {
          this._addStickyStyle(cell, isRtl ? 'left' : 'right', endPositions[i]);
        }
      }
    }
  }

  stickRows(rowsToStick: HTMLElement[], stickyStates: boolean[], position: 'top' | 'bottom') {
    // Since we can't measure the rows on the server, we can't stick the rows properly.
    if (!this.moka_isBrowser) {
      return;
    }

    // If positioning the rows to the bottom, reverse their order when evaluating the sticky
    // position such that the last row stuck will be "bottom: 0px" and so on.
    const rows = position === 'bottom' ? rowsToStick.reverse() : rowsToStick;

    let stickyHeight = position === 'bottom' ? this.stickyHeightBottom : this.stickyHeightTop;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      if (!stickyStates[rowIndex]) {
        continue;
      }

      const row = rows[rowIndex];
      if (this.moka_isNativeHtmlTable) {
        for (let j = 0; j < row.children.length; j++) {
          const cell = row.children[j] as HTMLElement;
          this._addStickyStyle(cell, position, stickyHeight);
        }
      } else {
        // Flex does not respect the stick positioning on the cells, needs to be applied to the row.
        // If this is applied on a native table, Safari causes the header to fly in wrong direction.
        this._addStickyStyle(row, position, stickyHeight);
      }

      if (rowIndex === rows.length - 1) {
        // prevent unnecessary reflow from getBoundingClientRect()
        return;
      }
      stickyHeight += row.getBoundingClientRect().height;
    }
  }

  /**
   * Determines the left and right positions of each sticky column cell, which will be the
   * accumulation of all sticky column cell widths to the left and right, respectively.
   * Non-sticky cells do not need to have a value set since their positions will not be applied.
   */
  _getStickyStartColumnPositions(widths: number[], stickyStates: boolean[], firstRowBcrt?:ClientRect | DOMRect): number[] {
    const positions: number[] = [];
    let nextPosition = 0;

    if(firstRowBcrt){
      let scroll = this.mokaScrollComponent.ref.nativeElement as HTMLDivElement
      let bcrt = scroll.getBoundingClientRect()
      nextPosition = Math.abs(bcrt.left - scroll.scrollLeft - firstRowBcrt.left)
    }

    for (let i = 0; i < widths.length; i++) {
      if (stickyStates[i]) {
        positions[i] = nextPosition;
        nextPosition += widths[i];
      }
    }

    return positions;
  }

  /**
   * Determines the left and right positions of each sticky column cell, which will be the
   * accumulation of all sticky column cell widths to the left and right, respectively.
   * Non-sticky cells do not need to have a value set since their positions will not be applied.
   */
  _getStickyEndColumnPositions(widths: number[], stickyStates: boolean[], firstRowBcrt?:ClientRect | DOMRect): number[] {
    const positions: number[] = [];
    let nextPosition = 0;

    if(firstRowBcrt){
      let scroll = this.mokaScrollComponent.ref.nativeElement as HTMLDivElement
      let bcrt = scroll.getBoundingClientRect()
      nextPosition = Math.abs(bcrt.right - firstRowBcrt.right)
    }

    for (let i = widths.length; i > 0; i--) {
      if (stickyStates[i]) {
        positions[i] = nextPosition;
        nextPosition += widths[i];
      }
    }

    return positions;
  }

  get stickyHeightTop() {
    let pinList = this.retainDirective.pinDirectives;
    if (!pinList.length) return 0
    let list = pinList.filter(p => p.direction === 'top').map(p => p.ref.nativeElement.clientHeight);
    if (!list.length) return 0
    return list.reduce((a, b) => a + b);
  }

  get stickyHeightBottom() {
    let pinList = this.retainDirective.pinDirectives;
    if (!pinList.length) return 0
    let list = pinList.filter(p => p.direction === 'bottom').map(p => p.ref.nativeElement.clientHeight);
    if (!list.length) return 0
    return list.reduce((a, b) => a + b);
  }
}
