import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'task',
    children: [
      {
        path: '',
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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
