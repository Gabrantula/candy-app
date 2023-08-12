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
    return this.http.get<Recipes[]>(`${apiUrl}`, httpOptions)
  }

  //details
  getRecipe(themeId: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipes>(`${apiUrl}/${themeId}`, httpOptions);

  }

  getEditData(themeId: string): Observable<Recipes> {
    const { apiUrl } = environment;
    return this.http.get<Recipes>(`${apiUrl}/${themeId}`)
  }

  updateEditData(themeId: string, updateData: any): Observable<any> {
    const { apiUrl } = environment
   // const headers = this.userService.getCommonHeaders()

    // return this.http.put(`${apiUrl}/${themeId}`, updateData, httpOptions)
    return this.http.put(`${apiUrl}/${themeId}`, updateData)
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error('Unauthorized access:', error)
          }
          else {
            console.error('Error updating edit data:', error)
          }
          return throwError('Error updating edit data')
        })
      )
  }


  createRecipe(imageUrl: string, themeName: string, postText: string) {
    const { apiUrl } = environment
  //  const headers = this.userService.getCommonHeaders()
    const requestBody = {
      imageUrl,
      themeName,
      postText,
      
    }
 // console.log(headers);
  
//const requestOptions = this.createRequestOptions()
return this.http.post<Recipes>(`${apiUrl}`, requestBody)

  }

  
  deleteRecipe(themeId: string) {
    const { apiUrl } = environment
    return this.http.delete<Recipes>(`${apiUrl}/${themeId}`)
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