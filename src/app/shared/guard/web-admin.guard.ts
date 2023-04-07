import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs';
import {Role} from "../enum/role.enum";

@Injectable({
  providedIn: 'root',
})
export class WebAdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.user) {
      this.router.navigate(['/login']).catch();
      return false;
    }

    console.log('WebAdminGuard - User:', this.auth.user);
    console.log('WebAdminGuard - Role:', this.auth.user.role);
    console.log('WebAdminGuard - Expected Role:', Role.WEB_ADMIN);

    if ((this.auth.user.role) !== Role.WEB_ADMIN) {
      alert('You are not a web admin!');
      return false;
    }

    return true;
  }
}
