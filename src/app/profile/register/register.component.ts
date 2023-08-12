import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    tel: [''],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePass: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePass')],
      }
    ),
  });
  isSuccessful = false
  isSignUpFailed = false
  errorMessage=''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }
  register(): void {
    if (this.form.invalid) {
      return;
    }

    const {
      username,
      email,
      passGroup: { password, rePass } = {},

    } = this.form.value;

    
    this.authService
      .register(username!, email!, password!, rePass!)
      .subscribe(() => {
        this.router.navigate(['/themes']);
      });
      /*
      this.authService
       .register(username!,email!, password!, rePass!).subscribe({
        next: data => {
          this.userService.saveUser(data)
          console.log(data);
         // this.isSuccessful= true
         // this.isSignUpFailed = false
          this.router.navigate(['/'])
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true
        }
       })*/
  }
}
