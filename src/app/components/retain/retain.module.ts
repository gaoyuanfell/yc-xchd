import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetainDirective } from './retain.directive';

@NgModule({
  declarations: [RetainDirective],
  imports: [
    CommonModule
  ],
  exports: [
    RetainDirective
  ]
})
export class RetainModule { }
