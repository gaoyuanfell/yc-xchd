/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:42
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-21 16:48:26
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { MokaLayerComponent } from './moka-layer/moka-layer.component';
import { MokaHeaderComponent } from './moka-header/moka-header.component';
import { MokaContentComponent } from './moka-content/moka-content.component';
import { MokaMenuComponent } from './moka-menu/moka-menu.component';
import { MokaMenuAccordionComponent } from './moka-menu/moka-menu-accordion.component';
import { BounceInRightComponent } from './prepare-route/bounce-in-right.component';
import { MokaModalComponent } from './moka-modal/moka-modal.component';
import { MatModule } from '../mat-module';
import { BounceInLeftComponent } from './prepare-route/bounce-in-left.component';
import { MokaScrollComponent } from './moka-scroll/moka-scroll.component';
import { FadeInOutComponent } from './prepare-route/fade-in-out.component';
import { MokaRouterTabsComponent } from './moka-router-tabs/moka-router-tabs.component';
import { MokaFullScreenComponent } from './moka-full-screen/moka-full-screen.component';
import { MokaTableComponent } from './moka-table/moka-table.component';

@NgModule({
  declarations: [
    MokaLayerComponent,
    MokaHeaderComponent,
    MokaContentComponent,
    MokaMenuComponent,
    MokaMenuAccordionComponent,

    MokaModalComponent,
    MokaScrollComponent,
    FadeInOutComponent,
    BounceInRightComponent,
    BounceInLeftComponent,
    MokaRouterTabsComponent,
    MokaFullScreenComponent,
    MokaTableComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatModule,
  ],
  exports: [
    MokaModalComponent,
    MokaScrollComponent,
    FadeInOutComponent,
    BounceInRightComponent,
    BounceInLeftComponent,
    MokaTableComponent
  ],
})
export class CoreModule { }
