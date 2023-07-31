import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Recipe } from './types/recipe';
import { Post } from './types/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // THEMES
  getTheme(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Recipe>(`${apiUrl}/themes/${id}`);
  }

  getThemes() {
    const { apiUrl } = environment;
    return this.http.get<Recipe[]>(`${apiUrl}/themes`);
  }

  createTheme(themeName: string, postText: string) {
    return this.http.post<Recipe>('/api/themes', { themeName, postText });
  }

  // POSTS
  getPosts(limit?: number) {
    const { apiUrl } = environment;
    const limitFilter = limit ? `?limit=${limit}` : '';

    return this.http.get<Post[]>(`${apiUrl}/posts${limitFilter}`);
  }
}