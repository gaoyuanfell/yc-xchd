import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    data: { animation: "TableModule", title: 'table' },
    children:[
      {
        path: 'test',
        component: TestComponent,
        data: { animation: "TestComponent", title: 'test' },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
