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
  id: string | null | undefined = localStorage.getItem("userId")

  recipes: Recipes[] = [];

  constructor(private authService: AuthService, private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {

    this.apiService.getOwnerRecipes(this.id).subscribe({
      next: (myRecipes) => {
        this.recipes = myRecipes

      },
      error: (error) => {
        console.error('Error fetching recipes:', error)
      }
    })
  }
}

