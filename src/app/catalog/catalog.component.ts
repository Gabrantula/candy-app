import { Component, OnInit } from '@angular/core';
import { Recipes } from '../types/theme';
import { ApiService } from '../_services/api.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{
  
 catalog: Recipes[] =[]
 isLoading: boolean = true

 constructor(private apiService: ApiService, private userService: UserService) {}

 /*
 get isLogged(): boolean {
  return this.userService.isLoggedIn()
 }*/
 ngOnInit(): void {
  
   this.apiService.getRecipes().subscribe({
    next: (themes) => {
      this.catalog = themes;
      this.isLoading = false;
      //console.log(themes);
    },
    error: (err) => {
      this.isLoading = false;
      console.error(`Error: ${err.errorMessage}`)
    }
   })
 }
}
