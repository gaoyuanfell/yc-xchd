import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';
import { MatModule } from './mat-module';
import { PinModule } from './components/pin/pin.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CoreModule,
    MatModule,

    PinModule,
  ],
  exports: [
    CoreModule,
    MatModule,

    PinModule,
  ]
})
export class BaseModule {}
