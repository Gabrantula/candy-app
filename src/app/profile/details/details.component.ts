import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { Recipes } from 'src/app/types/theme';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  isLoggedIn = false
  theme: Recipes | undefined
  userId: string | undefined | null = localStorage.getItem('userId')
  isOwner: boolean = false

  constructor(
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) { }
 
  ngOnInit(): void {

    this.fetchTheme()
  }
  itIsOwner(): void {
    if (this.theme?._ownerId === this.userId) {
      this.isOwner = true
    } else {
      return
    }
  }

  fetchTheme(): void {
    const id = this.activateRoute.snapshot.params['themeId']

    this.apiService.getRecipe(id).subscribe((theme) => {

      this.theme = theme
      this.itIsOwner()
    })
  }
  delete() {
    const id = this.activateRoute.snapshot.params['themeId']
    const conf = confirm('Are you shure you want to delete this recipe?')

    if (conf) {
      this.apiService.delete(id).subscribe({
        next: (res) => {
          alert('Successful !')
          this.router.navigate(['/themes'])
        },
        error: (err) => {
          if (err.status === 403) {
            alert('Unauthorized')
          } else {
            alert('Try again!')
          }
        }
      })
    }
  }
}


