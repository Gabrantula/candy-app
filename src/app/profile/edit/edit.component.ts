/*
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiService } from 'src/app/_services/api.service';
import { appEditValidator } from 'src/app/shared/validators/app-edit-validators';
import { UserService } from '../../_services/user.service';
import { UserId } from 'src/app/types/user-id';

interface Theme {

  imageUrl: string;
  themeName: string;
  postText: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 // @Input()
 // accessToken!: string;
  
 // isSubmitting: boolean = false;

  editRecipe: Theme = {

    imageUrl: '',
    themeName: '',
    postText: '',
  }

  form = this.fb.group({
    imageUrl: ['', [Validators.required, appEditValidator()]],
    themeName: ['', [Validators.required]],
    postText: ['', [Validators.required, Validators.minLength(10)]]
  })

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) { }

  authorId?: string


  fetchEditData(themeId: string): void {
    this.apiService.edit(themeId)
      .subscribe({
        next: (editData) => {
          
          console.log('Edit data:', editData);

          if (!editData) {
            console.error('Edit data not found');
            return;
          }
          this.editRecipe = {
            imageUrl: editData.imageUrl,
            themeName: editData.themeName,
            postText: editData.postText
          };
          this.form.patchValue(this.editRecipe);
         
        //  this.authorId = editData._ownerId

        //  console.log('authorId:', this.authorId);

        },
        error: (error) => {
          console.error('Error fetching edit data', error);
          // Handle the error (e.g., show an error message to the user)
        }
      });
  }

  ngOnInit(): void {
    const themeId = this.activateRoute.snapshot.params['themeId']
    this.fetchEditData(themeId)


  }

  saveEditHandler(): void {
    // console.log('saveEditHandler called');
    // console.log(this.form.status);
    // console.log(this.form.errors);

    const userId = this.userService.getUserId()
   // console.log('userId', userId);
    //console.log('authorId', this.authorId);


    if (userId && this.authorId && this.authorId === userId) {
      console.log('User is authorized to edit');

     // this.isSubmitting = true;
      this.updateEditData();
    }
    else {
      console.error('Unauthorized to edit this theme')
    }

    // if(this.userService.getUserId() !== this.authorId) {
    //  console.log('Unauthorized to edit this theme');
    //  return

    //  }
  }


  updateEditData(): void {

    console.log('Save edit handler called');
    if (this.form.invalid) {
      console.log('Form invalid');

      return;
    }
    console.log('Form valid, submitting data..');

    //this.editRecipe = {...this.form.value} as Theme
    const { imageUrl, themeName, postText } = { ...this.form.value } //as Theme
    const themeId = this.activateRoute.snapshot.params['themeId']

    const updateData = {
      imageUrl,
      themeName,
      postText,
    }


    this.apiService.updateEditData(themeId, updateData)
      .pipe(
        catchError((error) => {
          console.error('Error updating edit data:', error);
          this.router.navigate(['/error'], { queryParams: { message: 'Error updating edit data' } });
          return of(null)
        })
      )
      .subscribe(() => {
        console.log('Edit data updated successfully!');
        this.isSubmitting = false
        this.cdr.detectChanges()
        this.router.navigate(['/themes'])
      })
  }

  //toggleEditMode(): void {
  //   this.isEditMode = !this.isEditMode;
  // }
}
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/_services/api.service';
import { appEditValidator } from 'src/app/shared/validators/app-edit-validators';
import { Recipes } from 'src/app/types/theme';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  theme: Recipes | any
/*
  form = this.fb.group({
    imageUrl: ['', [Validators.required, appEditValidator()]],
    themeName: ['', [Validators.required]],
    postText: ['', [Validators.required, Validators.minLength(10)]]
  })
*/
  constructor(
    private fb: FormBuilder,
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