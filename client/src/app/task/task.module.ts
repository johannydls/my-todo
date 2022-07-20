import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { TaskRoutingModule } from './task-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    WizardComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule
  ],
})
export class TaskModule { }
