
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/_services/api.service';
import { Recipes } from 'src/app/types/theme';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  theme: Recipes | any

  constructor(
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  edit(form: NgForm): void {
    if (form.invalid) {
      alert('Some fields are either empty')
      return;
    }

    const value: { themeName: string, imageUrl: string, postText: string } = form.value

    this.apiService.edit(value, this.theme._id).subscribe({
      next: (res) => {
        this.router.navigate([`/themes/${this.theme._id}`])
      },
      error: (err) => {
        if(err.status === 403) {
          alert('Unauthorized')
          this.router.navigate([`/themes/${this.theme._id}`])
        } else {
          alert('Try again!')
        }
      }
    })
  }
   
  ngOnInit(): void {
    this.fetchRecipes()
  }
  fetchRecipes(): void {
    const id = this.activateRoute.snapshot.params['themeId']
    this.apiService.getRecipe(id).subscribe((recipe) => {
      this.theme= recipe
    })
  }
}