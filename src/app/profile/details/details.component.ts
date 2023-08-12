import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { Recipes } from 'src/app/types/theme';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  isLoggedIn = false
   theme: Recipes | undefined

   constructor(
    private apiService: ApiService, 
    private activateRoute: ActivatedRoute, 
    private userService: UserService
    ) {}
/*
    get isLogged(): boolean {
      return this.userService.isLogged
    }*/
    ngOnInit(): void {
      this.isLoggedIn = this.userService.isLoggedIn()

      if(this.isLoggedIn) {
        const user = this.userService.getUser()
       
      }
      this.fetchTheme()
    }
    fetchTheme(): void {
      const id = this.activateRoute.snapshot.params['themeId']

      this.apiService.getRecipe(id).subscribe((theme) => {
       
        this.theme = theme
        console.log('Owner', theme._ownerId);
        
      })
    }
  
  
 isOwner(_ownerId: string): boolean {
  const currentUserId = this.userService.getUserId()
  console.log('curr', currentUserId);
  
  return currentUserId === _ownerId
}
   
}
