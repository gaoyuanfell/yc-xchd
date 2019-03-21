/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:45
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-20 16:38:02
 */
import { SelectionModel } from "@angular/cdk/collections";
import { InjectFlags, Injector, ViewChild } from "@angular/core";
import { MatPaginator, MatSidenavContent, MatSort, PageEvent, Sort } from "@angular/material";
import { AutoCookie } from "./decorator/decorator";
import { MokaFullScreenComponent } from './moka-full-screen/moka-full-screen.component';
import { RetainService } from '../components/retain/retain.service';

export abstract class QueryComponent<T> {
  protected constructor(public injector: Injector) {
    this._retainService = injector.get(RetainService);
    this.matSidenavContent = injector.get(MatSidenavContent, undefined, InjectFlags.Host);
  }

  // ----------------- 分页 start--------------------------

  private _retainService: RetainService;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _tableList: T[] = [];

  set tableList(data: T[]) {
    this._tableList = data;
    this._retainService.subscribe()
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

  selectionChange(event, item){
    if(event){
      this.selection.toggle(item)
    }
  }

  selectionChecked(item){
    this.selection.isSelected(item)
  }

  selectionClick(event){
    event.stopPropagation()
  }

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
   * @description
   * 必须实现
   */
  abstract search(): void;

  // ----------------- 分页 end--------------------------

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
