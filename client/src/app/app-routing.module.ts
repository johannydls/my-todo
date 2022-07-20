import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: '',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: 'session',
    children: [
      {
        path: '',
        loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
