/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:59
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:11:59
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinDirective } from './pin.directive';
import { PinService } from './pin.service';

@NgModule({
  declarations: [
    PinDirective
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    PinDirective
  ],
  providers:[
    PinService
  ]
})
export class PinModule { }
