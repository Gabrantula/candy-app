
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { appEditValidator } from 'src/app/shared/validators/app-edit-validators';
import { UserService } from '../user.service';
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
  isSubmitting: boolean = false;

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

  ngOnInit(): void {
    const themeId = this.activateRoute.snapshot.params['themeId']
    this.fetchEditData(themeId)


  }
  fetchEditData(themeId: string): void {
    this.apiService.getEditData(themeId)
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
         
          this.authorId = editData._ownerId

          console.log('authorId:', this.authorId);

        },
        error: (error) => {
          console.error('Error fetching edit data', error);
          // Handle the error (e.g., show an error message to the user)
        }
      });
  }



  saveEditHandler(): void {
    // console.log('saveEditHandler called');
    // console.log(this.form.status);
    // console.log(this.form.errors);

    const userId = this.userService.getUserId()
    console.log('userId', userId);
    console.log('authorId', this.authorId);


    if (userId && this.authorId && this.authorId === userId) {
      console.log('User is authorized to edit');

      this.isSubmitting = true;
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
