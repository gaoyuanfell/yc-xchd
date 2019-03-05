import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator, MatSort, Sort, PageEvent } from "@angular/material";
import { ViewChild, Inject } from "@angular/core";
import { AutoCookie } from "./decorator/decorator";
import { PinService } from '../components/pin/pin.service';

export abstract class QueryComponent<T> {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Inject(PinService) pinService

  private _tableList: T[] = [];

  set tableList(data: T[]){
    this._tableList = data
  }

  get tableList():T[]{
    return this._tableList
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
  query;

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
    console.info(this.pinService)
  }
}
