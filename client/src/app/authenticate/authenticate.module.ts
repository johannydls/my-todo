import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { AuthenticateComponent } from './authenticate.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthenticateComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticateRoutingModule
  ],
  exports: [
    AuthenticateComponent,
    SigninComponent
  ]
})
export class AuthenticateModule { }
