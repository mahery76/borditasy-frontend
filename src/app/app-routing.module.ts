import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AuthenticationFormComponent } from './components/authentications/authentication-form/authentication-form.component';
const routes: Routes = [
  {
    path: '',
    component: AuthenticationFormComponent,
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: false // Change this to false
    })
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }


