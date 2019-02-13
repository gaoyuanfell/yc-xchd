import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';
import { MatModule } from './mat-module';
import { PinDirective } from './components/pin/pin.directive';

@NgModule({
  declarations: [
    PinDirective,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatModule,
  ],
  exports: [
    CoreModule,
    MatModule,

    PinDirective,
  ]
})
export class BaseModule {}
