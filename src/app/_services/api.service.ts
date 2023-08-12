import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Recipes } from '../types/theme';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  theme: Recipes | undefined;

  constructor(private http: HttpClient, private userService: UserService) { }

  //my-page
  getOwnerRecipes(id: string | null | undefined) {
    let { apiUrl } = environment;
    return this.http.get<Recipes[]>(`${apiUrl}?where=_ownerId%20LIKE%20%22${id}%22&sortBy=_createdOn%20desc`)
  }

  //catalog
  getRecipes() {
    let { apiUrl } = environment;
    return this.http.get<Recipes[]>(`${apiUrl}`)
  }

  //details
  getRecipe(themeId: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipes>(`${apiUrl}/${themeId}`);

  }

  edit(data: any, themeId: string): Observable<any> {
    const { apiUrl } = environment;

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('X-Authorization', '' + localStorage.getItem('accessToken'))
    return this.http.put(`${apiUrl}/${themeId}`, data, {headers: headers})
  }


  createRecipe(data: any): Observable<any> {
    const { apiUrl } = environment
   const headers= new HttpHeaders()
   .set('Content-Type', 'application/json')
   .set('X-Authorization', '' + localStorage.getItem('accessToken'))

    return this.http.post(`${apiUrl}`, data, {headers: headers})

  }

  delete(themeId: string): Observable<any> {
    const { apiUrl } = environment
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('X-Authorization', '' + localStorage.getItem('accessToken'))

    return this.http.delete(`${apiUrl}/${themeId}`, {
      headers: headers
    })
  }
 
}
