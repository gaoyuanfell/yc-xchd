/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:13:49
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:13:49
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StickyDirective } from "./sticky.directive";

@NgModule({
  declarations: [StickyDirective],
  imports: [CommonModule],
  exports: [StickyDirective]
})
export class StickyModule {}
