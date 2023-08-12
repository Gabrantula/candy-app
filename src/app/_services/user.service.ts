/*import { Injectable, OnDestroy } from '@angular/core';
import { UserId } from '../types/user-id';
import { Recipes } from '../types/theme';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, map, mergeMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserId | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: UserId | undefined;
  USER_KEY = '[user]';
  private userId: string | null = null

  private userTokenKey = 'auth-token'
 // private userToken: string | null = null
  
  get isLogged(): boolean {
    return !!this.user;
  }
  getUserId(): string | null {
    console.log(this.userId);
    
    return this.userId
  }


  subscription: Subscription;

  constructor(private http: HttpClient) {
  //  const token = localStorage.getItem('auth-token') || ""
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }
 
  
  public getAuthToken(): string | null {
  
    const authToken =localStorage.getItem("auth-token")
    console.log('Retrieved token:', authToken);
    
    return authToken
   // return localStorage.getItem(this.userTokenKey)
  }

  clearAuthToken(): void {
  //  this.userToken = null
    localStorage.removeItem(this.userTokenKey)
  }
 // private storeToken(token: string): void {
  //  localStorage.setItem("", token)
  //  this.getAuthToken()
   // this.userToken = token
   // localStorage.setItem(this.userTokenKey, token)
 // }



login(email: string, password: string): Observable<UserId> {

 // const headers = this.getCommonHeaders()
 // const headers = this.getCommonHeaders(authToken !== null ? authToken : undefined);
  const baseUrl = `http://localhost:3030/users`;

  return this.http
    .post<UserId>(`${baseUrl}/login`, { email, password })
    .pipe(
      tap((user) => {
       
        console.log('Login response', user);
        console.log('Access Token:', user.accessToken);
        
       // if (authToken) {
        if (user.accessToken) {
          localStorage.setItem('auth-token', user.accessToken);
          console.log('Token stored in localstorage:', user.accessToken);
          
        }
       
        this.user$$.next(user);
      }),
    
<<<<<<< HEAD:src/app/_services/user.service.ts
     // mergeMap(() => {
     //   return this.http.get<UserId>(`http://localhost:3030/data/recipes`);
    //  }),
      
=======
      mergeMap(() => {
        return this.http.get<UserId>(`${baseUrl}/profile`, { headers });
      }),
>>>>>>> 0bb75b987cf11ea8d1911ce6fb5449ac7db9a173:src/app/profile/user.service.ts
      tap((user) => {
        if (user && user._id) {
          this.userId = user._id; // Update the userId after successful login
        }
      })
    );
}

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
   
  ) {
  //  const headers = this.getCommonHeaders()
    const baseUrl = `http://localhost:3030/users`
    const authToken = this.getAuthToken()
    const headers = this.getCommonHeaders(authToken !== null ? authToken : undefined) 

    return this.http
      .post<UserId>(`${baseUrl}/register`, {
        username,
        email,
        password,
        rePassword
       
      }, {headers})
      .pipe(tap((user: any) => {
        if(authToken) {
            localStorage.setItem('auth-token', user.accessToken)
        }
      
        this.user$$.next(user)
    }));
  }

  logout() {
   
    const baseUrl = `http://localhost:3030/users`
  //  const headers = this.getCommonHeaders()

  // const authToken = this.getAuthToken()
   //const headers = this.getCommonHeaders(authToken !== null ? authToken : undefined) 
  // this.clearAuthToken()
   // const headers = this.getCommonHeaders() 
    return this.http
    .post<UserId>(`${baseUrl}/logout`, {})
      .pipe(tap(() => {
    this.clearAuthToken();
      this.user$$.next(undefined);
    }));
      
  }

  getProfile(): Observable<Recipes[]> {

    const userId = this.getUserId()
    if (!userId) {
      return of([])
    }
    // const baseUrl= `http://localhost:3030/users`
    const baseUrl = `http://localhost:3030/data/recipes`

    const authToken = this.getAuthToken()
    const headers = this.getCommonHeaders(authToken)
   // const headers = this.getCommonHeaders()

    return this.http
      // .get<UserId>('/api/users/profile')
      .get<Recipes[]>(`${baseUrl}?userId=${userId}`, { headers })
      .pipe(map((recipes) => {
        return recipes.map(recipe => {
          return {
            ...recipe
          }
        })
      }))
  }


  public getCommonHeaders(authToken?: string | null): HttpHeaders {
   
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      })
     // if (authToken) {
      if (authToken !== null && authToken !== undefined) {
        headers = headers.set('X-Authorization', `Bearer ${authToken}`)
      }
      console.log('Common', headers);
      
      return headers
    }
    
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}
<<<<<<< HEAD:src/app/_services/user.service.ts
*/

import { Injectable } from '@angular/core';
import { UserId } from '../types/user-id';
import { Recipes } from '../types/theme';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) { }

  clean(): void {
    window.localStorage.clear()
  }

  //ili user: UserId ili any
 // public saveUser(user: UserId): void {
  public saveUser(user: UserId): void {
    window.localStorage.removeItem(USER_KEY)
    console.log(user.accessToken);
    
    window.localStorage.setItem(USER_KEY, JSON.stringify(user.accessToken)!)
  // window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY)
    if(user) {
      return JSON.parse(user)
    }
    return {}
  }
  //user: UserId | undefined
  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY)
    if(user) {
    
      return true
    }
    return false
  }

  private userId: string | null = null

  public  getUserId(): string | null {
    console.log(this.userId);
    
    return this.userId
  }

  getProfile(): Observable<Recipes[]> {

    const userId = this.getUserId()
    if (!userId) {
      return of([])
    }
    
    const baseUrl = `http://localhost:3030/data/recipes`

    return this.http
      // .get<UserId>('/api/users/profile')
      .get<Recipes[]>(`${baseUrl}?userId=${userId}`)
      .pipe(map((recipes) => {
        return recipes.map(recipe => {
          return {
            ...recipe
          }
        })
      }))
  }

}
=======
>>>>>>> 0bb75b987cf11ea8d1911ce6fb5449ac7db9a173:src/app/profile/user.service.ts
