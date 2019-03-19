/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:45
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-19 17:43:51
 */
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator, MatSort, Sort, PageEvent, MatSidenav, MatSidenavContent, MatSidenavContainer } from "@angular/material";
import { ViewChild, Injector, forwardRef, Inject, Optional, Host, InjectFlags } from "@angular/core";
import { AutoCookie } from "./decorator/decorator";
import { PinService } from "../components/pin/pin.service";
import { PinDirective } from '../components/pin/pin.directive';
import { MokaScrollComponent } from './moka-scroll/moka-scroll.component';
import { MokaFullScreenComponent } from './moka-full-screen/moka-full-screen.component';

export abstract class QueryComponent<T> {
  protected constructor(public injector: Injector) {
    this._pinService = injector.get(PinService);
    this.matSidenavContent = injector.get(MatSidenavContent, undefined, InjectFlags.Host);
    // matSidenavContent._container.close()
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

  /**
   * 全屏
   */
  private matSidenavContent: MatSidenavContent;

  fullScreen(){
    let mokaFullScreenComponent = this.injector.get( MokaFullScreenComponent )
    mokaFullScreenComponent.toggle()
    mokaFullScreenComponent.opend ? this.matSidenavContent._container.close() : this.matSidenavContent._container.open()
  }
}
