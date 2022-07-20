import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WizardComponent } from './pages/wizard/wizard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    WizardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TaskModule { }
