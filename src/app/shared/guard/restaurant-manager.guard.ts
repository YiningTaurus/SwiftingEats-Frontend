import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs';
import {Role} from "../enum/role.enum";

@Injectable({
  providedIn: 'root',
})
export class RestaurantManagerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.user) {
      this.router.navigate(['/login']).catch();
      return false;
    }

    console.log('RestaurantManagerGuard - User:', this.auth.user);
    console.log('RestaurantManagerGuard - Role:', this.auth.user.role);
    console.log('RestaurantManagerGuard - Expected Role:', Role.RESTAURANT_MANAGER);


    if (this.auth.user.role !== Role.RESTAURANT_MANAGER) {
      alert('You are not a restaurant manager!');
      return false;
    }

    return true;
  }
}
