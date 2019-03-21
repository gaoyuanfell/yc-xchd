/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:09:34
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-21 10:42:10
 */
import { ChangeDetectionStrategy, Component, Injector, OnInit, TemplateRef, ViewChild, Host, Optional, Inject, forwardRef, ChangeDetectorRef } from "@angular/core";
import { MatDialog, MatDialogRef, MatSidenav, MatDrawerContainer, MatSidenavContent, MatDrawer } from "@angular/material";
import { QueryComponent } from "../core/query.component";
import { MokaScrollComponent } from '../core/moka-scroll/moka-scroll.component';

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent extends QueryComponent<any> implements OnInit {
  constructor(public injector: Injector, private matDialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
    super(injector);
    this.tableList = this.data
  }

  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];

  data = [
    { name: "Frozen yogurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4
    },
    { name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: "Cupcake", calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: "Gingerbread", calories: 356, fat: 16, carbs: 49, protein: 4 },
    { name: "Frozen yogurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4
    },
    { name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: "Cupcake", calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: "Gingerbread", calories: 356, fat: 16, carbs: 49, protein: 4 }
  ];

  ngOnInit() {
    // this.tableList = [];
  }

  search() {
    console.info(this.query);
  }

  test() {
    let list = [...this.tableList];
    list.push(...this.data);
    this.tableList = list;
    this.pageTotal = this.tableList.length;
  }

  trackBy(index, data){
    return data
  }

  @ViewChild("aaa", { read: TemplateRef }) aaa: TemplateRef<any>;

  open() {
    let matDialogRef: MatDialogRef<any, any> = this.matDialog.open(this.aaa);
    matDialogRef.afterOpened().subscribe(()=> {
      // this.test()
    })
    matDialogRef.afterClosed().subscribe(()=> {
    })
  }
}
