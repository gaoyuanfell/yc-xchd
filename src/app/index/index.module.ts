import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { BaseModule } from '../base-module';
import { IndexComponent } from './index.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule,
    BaseModule,
  ]
})
export class IndexModule { }
