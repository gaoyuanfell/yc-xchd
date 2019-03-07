import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StickyDirective } from "./sticky.directive";

@NgModule({
  declarations: [StickyDirective],
  imports: [CommonModule],
  exports: [StickyDirective]
})
export class StickyModule {}
