import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/_services/api.service';
import { UserService } from 'src/app/_services/user.service';


@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
  constructor(private userService: UserService, private apiService: ApiService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    const themeId = route.paramMap.get('themeId');

    if (themeId) {
      const userId = this.userService.getUserId()
      if (userId) {
        return this.apiService.getThemeAuthorId(themeId).pipe(
          map(themeAuthorId => {
            if (userId === themeAuthorId) {
              return true
            } else {
              return false
            }
          })
        )

      }
      else {
        return false
      }
     
    }
    return true
  }
}