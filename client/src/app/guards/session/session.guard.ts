import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.session.isLogged !== undefined && this.session.isLogged === false) {
      this.router.navigate(['/session/auth']);
      return false;
    }
    return true;
  }
}
