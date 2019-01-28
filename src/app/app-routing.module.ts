import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: 'index',
    loadChildren : './index/index.module#IndexModule'
  }
];

const routes: Routes = [
  {
    path:'login',
    loadChildren : './login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
