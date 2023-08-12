import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserId } from '../types/user-id';



const baseUrl = `http://localhost:3030/users`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false 

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<UserId>(
      `${baseUrl}/login`,
      { email: email, password: password },
      httpOptions
    )
  
  }

  register(username: string, email: string, password: string, rePass: string): Observable<UserId> {
    return this.http.post<UserId>(
      `${baseUrl}/register`,
      {
        username: username,
        email: email,
        password: password,
        rePass: rePass
      },
      httpOptions
    )
  
  }

}

