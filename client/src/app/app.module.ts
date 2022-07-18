import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { UserRoutingModule } from './user/user-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    AdminRoutingModule,
    UserModule,
    UserRoutingModule,
  ],
  providers: [
    UserService,
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
