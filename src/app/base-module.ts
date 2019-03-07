import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';
import { MatModule } from './mat-module';
import { PinModule, StickyModule } from './components';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CoreModule,
    MatModule,

    PinModule,
    StickyModule,
  ],
  exports: [
    CoreModule,
    MatModule,

    PinModule,
    StickyModule,
  ]
})
export class BaseModule {}
