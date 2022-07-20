import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
import { LoginForm, AxiosUserAuth } from '../../helpers/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private END_POINT: string;

  constructor(
    private session: SessionService
  ) {
    this.END_POINT = environment.base_url;
  }

  private getConfig(): any {
    const token = this.session.getAuthorization();
    axios.defaults.headers.common['Authorization'] = token;
    return { headers: { Authorization: token } };
  }

  public userAuthenticate(data: LoginForm): Promise<AxiosUserAuth> {
    return axios.post(this.END_POINT + '/user/authenticate', data);
  }
}
