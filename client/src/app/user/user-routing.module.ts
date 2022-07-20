import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../guards/session/session.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserComponent,
        canActivate: [SessionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
