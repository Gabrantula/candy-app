import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserId } from '../types/user-id';
import { Router } from '@angular/router';


const baseUrl = `http://localhost:3030/users`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubj: BehaviorSubject<UserId | null>
  public user: Observable<UserId | null>

  constructor(private http: HttpClient, private router: Router) {
    //this.userSubj = new BehaviorSubject(localStorage.getItem('auth-user'))
    this.userSubj = new BehaviorSubject(JSON.parse(localStorage.getItem('auth-user')!))
    this.user = this.userSubj.asObservable()
  }
  public get userValue() {
    return this.userSubj.value
  }

  login(email: string, password: string) {
    return this.http.post<UserId>(
      `${baseUrl}/login`,
      { email, password },
      httpOptions
    )
      .pipe(tap(user => {
       // localStorage.setItem('auth-user', JSON.stringify(user))
       localStorage.setItem('auth-user', user.accessToken!)
       console.log(user.accessToken);
       
        this.userSubj.next(user)
       // console.log(this.userSubj);
        
        return user
      }))
  }

  register(username: string, email: string, password: string, rePass: string): Observable<UserId> {
    return this.http.post<UserId>(
      `${baseUrl}/register`,
      {
        username,
        email,
        password,
        rePass
      },
      httpOptions
    )
      .pipe(tap(user => {
        localStorage.setItem('auth-user', JSON.stringify(user))
        this.userSubj.next(user)
        return user
      }))
  }

  logout() {
    return this.http
      .post<UserId>(`${baseUrl}/logout`,{}, httpOptions)
      .pipe(tap(() => {
        localStorage.removeItem('auth-user')
        this.userSubj.next(null)
      }))
    // return this.http.post<UserId>(`${baseUrl}/logout`, {}, httpOptions)
  }
}
