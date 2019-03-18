import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';
import { BaseModule } from '../base-module';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    TableComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableRoutingModule,
    BaseModule,
  ]
})
export class TableModule { }
