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

  errorMessage=''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }


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
      .subscribe({
        next: (res) => {
          if(res.accessToken) {
            this.userService.clearUser

            this.userService.saveUser('accessToken', res.accessToken)
            this.userService.saveUser('email', res.email)
            this.userService.saveUser('username', res.username)
            this.userService.saveUser('userId', res._id)
          }
          this.authService.isLoggedIn = true
          this.router.navigate(['/themes'])
        },
        error: (err) => {
          if(err.status === 409) {
            alert("An acount already exists")
          } else {
            alert('Try again!')
          }
        }
      })
     // .subscribe(() => {
     //   this.router.navigate(['/themes']);
   //   });
     
  }

  ngOnInit(): void {
localStorage.clear()
this.authService.isLoggedIn = false
  }
}
