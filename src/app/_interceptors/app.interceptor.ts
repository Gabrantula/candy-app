import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable, Provider } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable, catchError } from 'rxjs';
  import { environment } from '../../environments/environments'
  import { ErrorService } from '../core/error/error.service';
import { AuthService } from '../_services/auth.service';
  
  const { apiUrl } = environment;

  @Injectable()
  export class AppInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router, private errorServie: ErrorService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {

      if (req.url.startsWith('/api')) {
        req = req.clone({
          url: req.url.replace('/api', apiUrl),
          withCredentials: true, // Cookie -> JWT
        });
      }


const user = this.authService.userValue
const isLoggedIn= user?.accessToken
const isAppUrl = req.url.startsWith(apiUrl)

if(isLoggedIn && isAppUrl) {
  req = req.clone({
    setHeaders: {
      'X-Authorization': `Bearer ${user.accessToken}`
    }
  })
}
   return next.handle(req)
    //  const accessToken = sessionStorage.getItem('auth-user')
    /*
      if (accessToken) {

          req = req.clone({
              setHeaders: {
                  'X-Authorization': `Bearer ${accessToken}`,
                // 'X-Authorization': accessToken,
              }
          });

      }
  


      return next.handle(req).pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          } 
          else {
            this.errorServie.setError(err);
            this.router.navigate(['/error']);
          }
  
          return [err];
        })
      );*/

    }
   
  }

  export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS,
  };