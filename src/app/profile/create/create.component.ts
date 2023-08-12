import { Component, Inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/_services/api.service';
import { Recipes } from 'src/app/types/theme';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @Input()
  accessToken!: string;
  
  constructor(private apiService: ApiService, private router: Router) { }

  obs$ = new Observable()

  createSubmitHandler(form: NgForm): void {
    if (form.invalid) {
      return
    }

    const { imageUrl, themeName, postText } = form.value;
   // this.apiService.createRecipe(imageUrl, themeName, postText).subscribe()
    this.apiService.createRecipe(imageUrl, themeName, postText).subscribe({
      next: (response) => {
        console.log('Recipe created successfully:', response);
        this.router.navigate(['/my-page']);
      },
      error: (error) => {
        console.error('Error creating recipe:', error)
      }
    })
    
  }

}
