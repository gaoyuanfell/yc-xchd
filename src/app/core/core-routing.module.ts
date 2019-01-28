import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MokaLayerComponent } from './moka-layer/moka-layer.component';
import { rootRoutes } from '../app-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MokaLayerComponent,
    children: rootRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
