import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/helpers/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private AUTHORIZATION: string;
  private USER_ID: string | undefined;

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
    this.user = undefined;
  }

  public logout(): void {
    console.log('logout session')
  }

  public changeStatusNavbar(status: boolean): void {
    this.navbar.closed = status;
  }

  public getAuthorization(): string {
    return this.AUTHORIZATION;
  }

  public setAuthorization(value: string): void {
    localStorage.setItem('authorization', value);
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
    this.USER_ID = value;
  }

  public setUserName(value: string): void {
    this.USERNAME = value;
  }

  public getUser(): User | undefined {
    return this.user || undefined;
  }

  public setUser(data: User): void {
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
