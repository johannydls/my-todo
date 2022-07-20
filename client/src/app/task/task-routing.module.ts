import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../guards/session/session.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WizardComponent } from './pages/wizard/wizard.component';

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
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'new',
        component: WizardComponent,
        canActivate: [SessionGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
