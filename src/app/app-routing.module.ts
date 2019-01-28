import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'index',
    loadChildren : './index/index.module#IndexModule'
  }
];

const rootRoutes: Routes = [
  {
    path:'login',
    loadChildren : './login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
