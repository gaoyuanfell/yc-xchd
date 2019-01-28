import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MokaLayerComponent } from './moka-layer/moka-layer.component';
import { routes } from '../app-routing.module';

const coreRoutes: Routes = [
  {
    path: '',
    component: MokaLayerComponent,
    children: routes
  }
];

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
