import { Injectable, OnDestroy } from '@angular/core';
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
  private userToken: string | null = null
  
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
    this.subscription = this.user$.subscribe((user: any): any => {
      this.user = user;
    });
  }
  get token() {
    return localStorage.getItem('auth-token')|| ""
  }
  
  public getAuthToken(): string | null {
  
    return localStorage.getItem("auth-token")
   // return localStorage.getItem(this.userTokenKey)
  }

  clearAuthToken(): void {
    this.userToken = null
    localStorage.removeItem(this.userTokenKey)
  }
 // private storeToken(token: string): void {
  //  localStorage.setItem("auth-token", token)
  //  this.getAuthToken()
   // this.userToken = token
   // localStorage.setItem(this.userTokenKey, token)
 // }


    /** login(email: string, password: string): Observable<UserId> {
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
  } */
  /*
  login(email: string, password: string): Observable<UserId> {
    const authToken = this.getAuthToken()
    const headers = this.getCommonHeaders(authToken !== null ? authToken : undefined) 


    const baseUrl = `http://localhost:3030/users`

    return this.http
      .post<UserId>(`${baseUrl}/login`, { email, password }, {headers})
      .pipe(tap((user) => {
        if(authToken) {
            localStorage.setItem('auth-token', user.accessToken)
        //  localStorage.setItem('auth-token', authToken)
        }
       
        console.log('uauu', user.accessToken);
        console.log(headers);
        
      //  localStorage.getItem(user.accessToken)
        this.user$$.next(user)
    }));
  }
*/

login(email: string, password: string): Observable<UserId> {
  const authToken = this.getAuthToken();
  const headers = this.getCommonHeaders(authToken !== null ? authToken : undefined);
  const baseUrl = `http://localhost:3030/users`;

  return this.http
    .post<UserId>(`${baseUrl}/login`, { email, password }, { headers })
    .pipe(
      tap((user) => {
        if (authToken) {
          localStorage.setItem('auth-token', user.accessToken);
        }
        console.log('uauu', user.accessToken);
        console.log(headers);
        this.user$$.next(user);
      }),
    
      mergeMap(() => {
        return this.http.get<UserId>(`${baseUrl}/profile`, { headers });
      }),
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
   // const headers = this.getCommonHeaders()
   const authToken = this.getAuthToken()
   const headers = this.getCommonHeaders(authToken !== null ? authToken : undefined) 
  // this.clearAuthToken()
   // const headers = this.getCommonHeaders() 
    return this.http
    .post<UserId>(`${baseUrl}/logout`, {}, { headers })
      .pipe(tap(() => {
    this.clearAuthToken();
      this.user$$.next(undefined);
    }));
      
  }
/*

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

  getProfile() {
    return this.http
      .get<UserId>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }*/
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

  updateProfile(username: string, email: string) {
    return this.http
      .put<UserId>('/api/users/profile', { username, email})
      .pipe(tap((user) => this.user$$.next(user)));
  }

  public getCommonHeaders(authToken?: string): HttpHeaders {
    //  let authToken = this.getAuthToken()
 // let authToken = localStorage.getItem("auth-token")
  //let authToken = this.user?.accessToken
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
      if (authToken) {
  
        headers = headers.set('X-Authorization', `Bearer ${authToken}`)
     
      }
      console.log('Common', authToken);
      
      return headers
    }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}
