import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { Recipes } from 'src/app/types/theme';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css'],
})
export class MyPageComponent implements OnInit {
  recipes: Recipes[] = [];

  constructor(private authService:AuthService, private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    /*
    const userId = this.userService.getUserId()

    if(userId) {
      this.apiService.getRecipesByUserId(userId).subscribe((recipes) => {
        this.recipes = recipes;
      })
    }
    */
    const loggedInUserId = this.userService.getUserId()
   //const loggedInUserId= this.userService.getUser()

    if (loggedInUserId) {
      
      this.apiService.getRecipesByUserId(loggedInUserId).subscribe({
        next: (myRecipes) => {
          this.recipes = myRecipes.filter((recipe) => recipe._ownerId === loggedInUserId)
          console.log(loggedInUserId);
          
        },
        error: (error) => {
          console.error('Error fetching recipes:', error)
        }
      })
    }
  }
}
