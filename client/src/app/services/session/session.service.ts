import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public navbar: { closed: boolean } = {
    closed: false
  }

  constructor() { }

  public changeStatusNavbar(status: boolean): void {
    this.navbar.closed = status;
  }
}
