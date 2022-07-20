import { Injectable } from '@angular/core';
import axios from 'axios';
import { AxiosTasksPaginate } from 'src/app/helpers/interfaces';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private END_POINT: string;

  constructor(
    private session: SessionService
  ) {
    this.END_POINT = environment.base_url;
  }

  private getAuthToken(): any {
    const token = this.session.getAuthorization() || '';
    axios.defaults.headers.common['Authorization'] = token;
    return { headers: { Authorization: token } };
  }

  public getTasks(): Promise<AxiosTasksPaginate> {
    return axios.get(this.END_POINT + '/task/list', this.getAuthToken());
  }
}
