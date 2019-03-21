import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';
import { MatModule } from './mat-module';
import { PinModule, StickyModule, RetainModule } from './components';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CoreModule,
    MatModule,

    PinModule,
    StickyModule,
    RetainModule
  ],
  exports: [
    CoreModule,
    MatModule,

    PinModule,
    StickyModule,
    RetainModule,
  ]
})
export class BaseModule {}
