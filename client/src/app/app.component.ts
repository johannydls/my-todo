import { Component } from '@angular/core';
import { SessionService } from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Tasks';

  constructor(
    private session: SessionService
  ) { }

  public isLogged(): boolean {
    return this.session.getIsLogged();
  }

  public getUser(): any {
    return this.session.getUser();
  }

  public navbar(): { closed: boolean } {
    return this.session.navbar;
  }
}
