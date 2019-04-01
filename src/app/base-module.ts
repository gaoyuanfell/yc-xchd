import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CdkModule } from './cdk-module';
import Components from './components';
import { CoreModule } from './core/core.module';
import { MatModule } from './mat-module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CoreModule,
    MatModule,
    CdkModule,

    ...Components
  ],
  exports: [
    CoreModule,
    MatModule,
    CdkModule,

    ...Components
  ]
})
export class BaseModule {}
