import { Component, Input, OnInit } from '@angular/core';
import { AxiosCatch, AxiosUserAuth, LoginForm } from 'src/app/helpers/interfaces';
import { UserService } from 'src/app/services/user/user.service';
import { AxiosError } from 'axios'
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../../helpers/styles/form.scss']
})
export class SigninComponent implements OnInit {

  @Input() actualRoute: string;

  public loginForm: LoginForm;
  public errors: loginErrors;
  public loading: boolean;

  constructor(
    private session: SessionService,
    private ctrlUser: UserService,
  ) {
    this.resetErrors();
    this.loading = false;
    this.loginForm = {
      email: 'johanny.dls@gmail.com',
      password: '123456'
    };
  }

  ngOnInit(): void {
    // console.log(this.actualRoute)
  }

  public signIn(): void {
    console.log(this.loginForm);
    this.resetErrors();
    this.loading = true;
    this.ctrlUser.userAuthenticate(this.loginForm).then((res) => {
      this.loading = false;
      console.log(res.data);
      this.authSuccess(res);
    }).catch((err: AxiosCatch) => {
      this.loading = false;
      const error_type = err.response?.data?.type || 'INTERNAL_ERROR';
      console.log(err.response?.data);
      if (error_type === 'NOT_FOUND') {
        this.errors.not_found = true;
      } else if (error_type === 'INVALID_PASSWORD') {
        this.errors.invalid_password = true;
      } else {
        this.errors.internal_error = true;
      }
    });
  }

  public authSuccess(res: AxiosUserAuth): void {
    console.log('authSuccess')
    this.session.setAuthorization(res.data.token);
    this.session.setUserID(res.data.user._id);
    this.session.setUserName(res.data.user.name);
    this.session.setUser(res.data.user);
    this.session.setIsLogged(true);
    this.session.routeNavigate('/user/profile');
  }

  public resetErrors(): void {
    this.errors = {
      not_found: false,
      invalid_password: false,
      internal_error: false
    };
  }


}

interface loginErrors {
  not_found: boolean;
  invalid_password: boolean;
  internal_error: boolean;
}
