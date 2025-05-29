import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonLayoutComponent } from './person-layout/person-layout.component';
import { PersonRegisterComponent } from './person-register/person-register.component';
import { PersonListComponent } from './person-list/person-list.component';


const routes: Routes = [
  {
    path: '',
    component: PersonLayoutComponent,
    children: [
      { path: '', component: PersonListComponent }, 
      { path: 'create', component: PersonRegisterComponent },
      { path: 'edit/:id', component: PersonRegisterComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes) 
  ],
  exports: [
    RouterModule
  ]
})
export class PersonRoutingModule { }

export { routes as PersonRoutingRoutes };