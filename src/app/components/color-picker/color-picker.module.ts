import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent } from './color-picker.component';

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    ColorPickerComponent
  ]
})
export class ColorPickerModule { }
