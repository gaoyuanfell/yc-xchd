import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MokaLayerComponent } from './moka-layer/moka-layer.component';

const routes: Routes = [
  {
    path: '',
    component: MokaLayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
