import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'index',
    loadChildren : 'src/app/index/index.module#IndexModule',
    data: { animation: "IndexModule" },
  },
  {
    path: 'home',
    loadChildren : 'src/app/home/home.module#HomeModule',
    data: { animation: "HomeModule" },
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
