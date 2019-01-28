import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { BaseModule } from '../base-module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    BaseModule,
  ]
})
export class IndexModule { }