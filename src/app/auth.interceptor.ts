import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../environments/environments'

import { UserService } from './profile/user.service';

const { apiUrl } = environment

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private userService: UserService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
       // if (this.userService.isLogged) {
      //  const tokenA = this.userService.getAuthToken()
      const tokenA = localStorage.getItem('auth-token')
      /*  if(tokenA) {
            const token = this.userService.getAuthToken()
            req = req.clone({
                url: req.url.replace('/data/recipes','/users'),
                setHeaders: {
                    'Content-Type': 'application/json',
                   'X-Authorization': `Bearer ${token}`
                },
               // setParams: {
               //     'auth-token': token ?? ""
               // }
            })
        }*/
        if(tokenA) {
            req = req.clone({
                setHeaders: {
                    'X-Authorization': tokenA
                }
            })
        }
        return next.handle(req)
    /*    return next.handle(req).pipe(
            tap(() => {
                console.log('Intercept', tokenA);

            }),
            catchError((error: HttpErrorResponse) => {
                console.log('[Interceptor Error]', error);
                if (error.status === 401) {
                    this.userService.logout()
                    this.router.navigate(['/auth/login'])
                }
                return throwError(error)
            })
        )
*/
    }
}

export const authInterceptorProvider: Provider = {
    multi: true,
    useClass: AuthInterceptor,
    provide: HTTP_INTERCEPTORS,
};