import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  Sort,
  PageEvent
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { AutoCookie } from '../core/decorator/decorator';
import { PinService } from '../components/pin/pin.service';
import { QueryComponent } from '../core/query.component';
import { InjectableDef } from '@angular/compiler';

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
  styleUrls: ["./table.component.less"]
})
export class TableComponent extends QueryComponent<any> implements OnInit {

  constructor() {
    // private pinService:PinService
    super()
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  ngOnInit() {
    // this.pinService.subscribe()
    this.tableList = [
      {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
      {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
      {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
      {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
      {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
      {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
      {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
      {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
      {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
      {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
      {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
      {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
      {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
      {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
      {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
      {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
      {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
      {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
      {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
      {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
    ];
  }

  search(){
    console.info(this.query)
  }

  test(){
    console.info(this.selection)
  }

}
