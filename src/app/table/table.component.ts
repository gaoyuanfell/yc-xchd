import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { QueryComponent } from "../core/query.component";

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
})
export class TableComponent extends QueryComponent<any> implements OnInit {
  constructor(public injector: Injector, private matDialog: MatDialog) {
    super(injector);
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
    this.tableList = [];
  }

  search() {
    console.info(this.query);
  }

  test() {
    console.info(this.selection);
    let list = [...this.tableList];
    list.push(...this.data);
    this.tableList = list;
    this.pageTotal = this.tableList.length;
  }

  @ViewChild("aaa", { read: TemplateRef }) aaa: TemplateRef<any>;

  open() {
    this.test()
    let matDialogRef: MatDialogRef<any, any> = this.matDialog.open(this.aaa);
    matDialogRef.afterClosed().subscribe(()=> {
      console.info('ok')
    })
  }
}
