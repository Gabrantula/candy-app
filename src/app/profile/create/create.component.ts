import { Component, Inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { ApiService } from 'src/app/_services/api.service';
//import { Recipes } from 'src/app/types/theme';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
 // @Input()
 // accessToken!: string;
  
  constructor(private apiService: ApiService, private router: Router) { }

 // obs$ = new Observable()

  create(form: NgForm): void {
    if (form.invalid) {
      return
    }

    const value: { imageUrl: string, themeName: string, postText: string } = form.value;

    this.apiService.createRecipe(value).subscribe({
      next: (res) => {
      
        this.router.navigate(['/themes']);
      },
      error: (err) => {
       if(err.status === 401) {
        alert('Unauthorized')
       } else {
        alert('Try again')
       }
      }
    })
    
  }

}
