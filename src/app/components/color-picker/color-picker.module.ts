import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerDirective, MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './color-picker.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatModule } from 'src/app/mat-module';

@NgModule({
  declarations: [ColorPickerComponent, ColorPickerDirective],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    MatModule
  ],
  exports:[
    ColorPickerComponent,
    ColorPickerDirective
  ],
  providers:[
    MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
  ],
  entryComponents:[
    ColorPickerComponent
  ]
})
export class ColorPickerModule { }
