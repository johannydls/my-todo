import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AxiosUser, User } from 'src/app/helpers/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private END_POINT: string;

  private AUTHORIZATION: string | undefined;
  private USER_ID: string;

  public user: User | undefined;
  public USERNAME: string | undefined;
  public isLogged: boolean;

  public navbar: Navbar = {
    closed: false
  }

  constructor(
    private router: Router
  ) {
    this.isLogged = false;
    this.END_POINT = environment.base_url;
    this.init();
  }

  // ---------------------------------------------------------------------------- //
  private getAuthToken(): any {
    const token = this.getAuthorization() || '';
    axios.defaults.headers.common['Authorization'] = token;
    return { headers: { Authorization: token } };
  }

  private updateSession(): Promise<AxiosUser> {
    return axios.get(this.END_POINT + '/user/profile', this.getAuthToken());
  }
  // ---------------------------------------------------------------------------- //

  public init(): void {
    console.log('init session service');
    this.navbar.closed = localStorage.getItem('nav_closed') === 'true';

    if (!!localStorage.getItem('authorization')) {
      console.log('Localstorage found')
      console.log(localStorage.getItem('authorization'));
      this.isLogged = true;
      const expires = new Date(localStorage.getItem('expiresIn') || Date.now());
      expires.setMinutes(expires.getMinutes() - 1);

      if (expires > new Date(Date.now())) {
        this.setAuthorization(localStorage.getItem('authorization')!);
        this.setUserID(localStorage.getItem('user_id')!);
        this.updateSession().then(res => {
          this.setUser(res.data);
          this.setUserName(localStorage.getItem('user_name')!);
          this.setIsLogged(true);
        }).catch(err => {
          this.logout();
          this.router.navigate(['/session/auth']);
        });
      } else {
        this.logout();
        this.router.navigate(['/session/auth']);
      }
    }
  }

  public logout(): void {
    console.log('logout session');
    const navClosed = localStorage.getItem('nav_closed') || false;
    localStorage.clear();
    localStorage.setItem('nav_closed', navClosed.toString());
    this.setIsLogged(false);
    this.setUser(undefined);
    this.setUserName(undefined);
  }

  public changeStatusNavbar(status: boolean): void {
    this.navbar.closed = status;
  }

  public getAuthorization(): string | undefined {
    return this.AUTHORIZATION;
  }

  public setAuthorization(value: string | undefined): void {
    localStorage.setItem('authorization', value || '');
    this.AUTHORIZATION = value;
  }

  public getIsLogged(): boolean {
    return this.isLogged;
  }

  public setIsLogged(value: boolean): void {
    this.isLogged = value;
  }

  public getUserID(): string | any {
    this.USER_ID;
  }

  public setUserID(value: string): void {
    localStorage.setItem('user_id', value || '');
    this.USER_ID = value;
  }

  public setUserName(value: string | undefined): void {
    localStorage.setItem('user_name', value || '');
    this.USERNAME = value;
  }

  public getUser(): User | undefined {
    return this.user || undefined;
  }

  public setUser(data: User | undefined): void {
    this.user = data;
  }

  public async routeNavigate(route: string, params: any = {}): Promise<boolean> {
    return this.router.navigate([route], params);
  }

  public getRouter(): Router {
    return this.router;
  }
}

interface Navbar {
  closed: boolean;
}
