/*import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments'

import { UserService } from '../_services/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private userService: UserService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // if (this.userService.isLogged) {

        const accessToken = sessionStorage.getItem('auth-user')
        //   sessionStorage.setItem('auth-token', accessToken!)

        //const accessToken = ''
        //  const { accessToken }: any = this.userService.userValue


        if (accessToken) {

            req = req.clone({
                setHeaders: {
                    'X-Authorization': `Bearer ${accessToken}`,
                }
            });

        }
        //  }
        return next.handle(req)
    }
}
export const authInterceptorProvider: Provider = {
    multi: true,
    useClass: AuthInterceptor,
    provide: HTTP_INTERCEPTORS,
}
*/