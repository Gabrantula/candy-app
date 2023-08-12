import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Recipes } from '../types/theme';
import { BehaviorSubject, Observable, Subscription, catchError, map, tap, throwError } from 'rxjs';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {

  //private themeSubj: BehaviorSubject<Recipes | null>
  //public theme: Observable<Recipes | null>
  private theme$$ = new BehaviorSubject<Recipes | undefined>(undefined);
  public theme$ = this.theme$$.asObservable();

  theme: Recipes | undefined;
  THEME_KEY = '[themes]';

  subscription: Subscription
  //


  constructor(private http: HttpClient, private userService: UserService) {
    //

    this.subscription = this.theme$.subscribe((theme) => {
      this.theme = theme
    })
  }


  getRecipesByUserId(userId: string): Observable<Recipes[]> {


    let { apiUrl } = environment;
    return this.http.get<Recipes[]>(`${apiUrl}/recipes?_ownerId=${userId}`, httpOptions)
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

  getThemeAuthorId(themeId: string): Observable<string> {
    const { apiUrl } = environment
    return this.http.get<{ authorId: string }>(`${apiUrl}/${themeId}/_ownerId`)
      .pipe(
        map(res => res.authorId),
        catchError(err => {
          console.error('Error fetching theme author ID:', err)
          return throwError(`Error fetching theme author ID `)
        })
      )
  }


  //
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
