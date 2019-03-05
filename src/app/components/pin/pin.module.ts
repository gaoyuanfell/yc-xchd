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
