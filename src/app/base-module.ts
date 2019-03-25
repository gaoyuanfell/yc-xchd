import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from './core/core.module';
import { MatModule } from './mat-module';
import { PinModule, StickyModule, ColorPickerModule } from './components';
import { CdkModule } from './cdk-module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CoreModule,
    MatModule,
    CdkModule,

    PinModule,
    StickyModule,
    ColorPickerModule,
  ],
  exports: [
    CoreModule,
    MatModule,
    CdkModule,

    PinModule,
    StickyModule,
    ColorPickerModule,
  ]
})
export class BaseModule {}
