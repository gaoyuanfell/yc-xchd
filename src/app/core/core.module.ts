import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { MokaLayerComponent } from './moka-layer/moka-layer.component';
import { MokaHeaderComponent } from './moka-header/moka-header.component';
import { MokaSidenavComponent } from './moka-sidenav/moka-sidenav.component';
import { MokaContentComponent } from './moka-content/moka-content.component';
import { BaseModule } from '../base-module';

@NgModule({
  declarations: [
    MokaLayerComponent,
    MokaHeaderComponent,
    MokaSidenavComponent,
    MokaContentComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    BaseModule,
  ]
})
export class CoreModule { }
