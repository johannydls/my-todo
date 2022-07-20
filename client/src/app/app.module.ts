import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
  ],
  providers: [
    UserService,
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
