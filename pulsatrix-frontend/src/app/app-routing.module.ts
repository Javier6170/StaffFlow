import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingRoutes } from './auth/auth-routing.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutComponent } from './modules/layout/layout.component';
import { PersonRoutingRoutes } from './modules/persons/person-routing.module';
import { NoAuthGuard } from './core/service/auth/noauth.service';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],        // protege dashboard, person, etc.
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'person',
        loadChildren: () =>
          import('./modules/persons/person-routing.module')
            .then(m => m.PersonRoutingModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
