
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) { }

  saveUser(key: string, value: string): void {
    localStorage.setItem(key, value)
  }
  clearUser(): void {
    window.localStorage.clear()
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY)
    if(user) {
      return JSON.parse(user)
    }
    return {}
  }

}

