
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, of, tap } from 'rxjs';
//import { User } from 'src/app/types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserId } from '../types/user-id';
import { Recipes } from '../types/theme';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private user$$ = new BehaviorSubject<UserId | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: UserId | undefined;

  //USER_KEY = '[user]';
  subscription: Subscription

  private userTokenKey = 'auth-token'
  private userToken: string | null = null

  private userId: string | null = null



  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user
    })

    this.userToken = this.getAuthToken()
  }
  getUserId(): string | null {
    return this.userId
  }
  get isLogged(): boolean {
    return !!this.user
  }
  private storeToken(token: string): void {
    this.userToken = token
    localStorage.setItem(this.userTokenKey, token)
  }


  public getAuthToken(): string | null {

    return localStorage.getItem(this.userTokenKey)
  }

  public getCommonHeaders(): HttpHeaders {

    //  let authToken = this.getAuthToken()

    // console.log('getCommonHeaders', authToken);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    if (this.userToken) {

      headers = headers.set('X-Authorization', `Bearer ${this.userToken}`)

    }
    return headers
  }
  /*
    private storeAuthToken(token: string): void {
      //localStorage.setItem('auth-token', JSON.stringify(token))
      // window.localStorage["auth-token"] = JSON.stringify(token)
      localStorage.setItem('auth-token', token)
      // window.localStorage["auth-token"] = token
      this.getAuthToken()
      console.log('Token stored:', token);
  
    }
  
     getAuthToken(): string | undefined {
  
      let authToken = localStorage.getItem("auth-token")
  
      if (authToken) {
        console.log('Token retrieved:', authToken);
        return authToken
      }
  
      console.log('No token found');
      return undefined
    }
    private clearAuthToken(): void {
      //localStorage.removeItem('auth-token')
      window.localStorage.removeItem("auth-token")
      window.localStorage.clear()
     
    }
  */

  login(email: string, password: string): Observable<UserId> {
    const baseUrl = `http://localhost:3030/users`
    const headers = this.getCommonHeaders()

    return this.http
      // .post<UserId>('/api/login', {email, password})
      .post<UserId>(`${baseUrl}/login`, { email, password }, { headers })
      .pipe(tap((user) => {

        //   this.storeAuthToken(user.accessToken)
        this.storeToken(user.accessToken)

        console.log('Token:', user.accessToken);
        this.user$$.next(user);

      }))
  }

  /* register(
     username: string,
     email: string,
     password: string,
     rePass: string
   ) {
     const baseUrl = `http://localhost:3030/users`
     const headers = this.getCommonHeaders()
 
     return this.http
       //.post<UserId>('/api/register', {
       .post<UserId>(`${baseUrl}/register`, {
         username,
         email,
         password,
         rePass
       }, { headers })
       .pipe(tap((user) => {
         if (user.accessToken) {
           this.storeAuthToken(user.accessToken)
         }
         this.user$$.next(user)
       })
       )
   }
 */
  register(
    username: string,
    email: string,
    password: string,
    rePass: string
  ): Observable<UserId> {
    const baseUrl = `http://localhost:3030/users`
    const headers = this.getCommonHeaders()

    return this.http
      //.post<UserId>('/api/register', {
      .post<UserId>(`${baseUrl}/register`, {
        username,
        email,
        password,
        rePass
      }, { headers })
      .pipe(
        map((user) => {
          return user
        }),
        tap((transformUser) => {
          if (transformUser.accessToken) {

            this.storeAuthToken(transformUser.accessToken)
            this.getAuthToken()
          }
          this.user$$.next(transformUser)
        })
      )
  }

  logout() {
    const baseUrl = `http://localhost:3030/users`
    let headers = this.getCommonHeaders()

    return this.http

      .post<UserId>(`${baseUrl}/logout`, {}, { headers })
      .pipe(tap(() => {
        this.clearAuthToken();
        //  this.clearAuthToken();
        this.user$$.next(undefined);
      }))
  }


  getProfile(): Observable<Recipes[]> {

    const userId = this.getUserId()
    if (!userId) {
      return of([])
    }
    // const baseUrl= `http://localhost:3030/users`
    const baseUrl = `http://localhost:3030/data/recipes`
    const headers = this.getCommonHeaders()

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
  /*
    private storeUserId(userId: string): void {
      this.userId = userId
    }
  */
  /*
    updateProfile(username: string, email: string, tel?: string) {
      return this.http
      .put<UserId>('/users', { username, email, tel })
       // .put<UserId>('/api/users/profile', { username, email, tel })
        .pipe(tap((user) => this.user$$.next(user)));
    }
  */
  /*
     private storeAuthToken(token: string): void {
     // this.userToken = token
     //  localStorage.setItem(this.userTokenKey, token)
     this.storeToken(token)
      }
  
     
      clearAuthToken(): void {
        this.userToken = null
        localStorage.removeItem(this.userTokenKey)
      }
      */

  ///////
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}

