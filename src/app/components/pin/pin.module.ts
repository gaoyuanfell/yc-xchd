/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:59
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-20 14:14:55
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinDirective } from './pin.directive';

@NgModule({
  declarations: [
    PinDirective
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    PinDirective
  ]
})
export class PinModule { }
