import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public mode: string = 'app';
  public closed: boolean = false;

  constructor(
    private session: SessionService,
  ) { }

  ngOnInit(): void {
  }

  public showNavbar(): boolean {
    return this.isLogged();
  }

  public isLogged(): boolean {
    return this.session.getIsLogged() && !!this.session.getUser();
  }

  public isAdmin(): boolean {
    return true;
  }

  public changeMode(type: 'app' | 'admin'): void {
    this.mode = type;
  }

  public setNavbarView(): void {
    this.closed = !this.closed;
    this.session.changeStatusNavbar(this.closed);
  }

  public getUserName(): string {
    return this.session.getUser()?.name || '';
  }

  public getUserEmail(): string {
    return this.session.getUser()?.email || '';
  }

  public signOut(): void {
    this.session.routeNavigate('/session/auth');
    this.session.logout();
  }

}
