import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingRoutes } from './auth/auth-routing.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutComponent } from './modules/layout/layout.component';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () =>
      import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  ...AuthRoutingRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
