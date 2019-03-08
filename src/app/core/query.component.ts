/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:45
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:11:45
 */
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator, MatSort, Sort, PageEvent } from "@angular/material";
import { ViewChild, Injector } from "@angular/core";
import { AutoCookie } from "./decorator/decorator";
import { PinService } from "../components/pin/pin.service";

export abstract class QueryComponent<T> {
  protected constructor(public injector: Injector) {
    this._pinService = injector.get(PinService);
  }

  private _pinService: PinService;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _tableList: T[] = [];

  set tableList(data: T[]) {
    this._tableList = data;
    this._pinService.subscribe();
  }

  get tableList(): T[] {
    return this._tableList;
  }

  selection = new SelectionModel<T>(true, []);
  pageSizeList = [5, 10, 20, 50, 100];
  pageTotal = 0;

  @AutoCookie({
    defaultValue: {
      pageSize: 25,
      pageIndex: 0
    }
  })
  protected query;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableList.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableList.forEach(row => this.selection.select(row));
  }

  indeterminate() {
    return this.selection.hasValue() && !this.isAllSelected();
  }

  checked() {
    return this.selection.hasValue() && this.isAllSelected();
  }

  /**
   * @description
   * 必须实现
   */
  abstract search(): void;

  sortData(sort: Sort) {
    this.query.active = sort.active;
    this.query.direction = sort.direction;
    this.search();
  }

  page(page: PageEvent) {
    this.query.pageSize = page.pageSize;
    this.query.pageIndex = page.pageIndex;
    this.search();
  }
}
