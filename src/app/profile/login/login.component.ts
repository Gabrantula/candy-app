import { Component, OnInit } from '@angular/core';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appEmailDomains = DEFAULT_EMAIL_DOMAINS
  form = this.fb.group({

    email: [
      '',
      [Validators.required]],
    password: ['', [Validators.required]],

  });
  isLoggedIn = false;
  //isLoginFailed = false
  errorMessage = ''
  //roles: string[] = []

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder,) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.isLoggedIn = true
     // this.roles = this.userService.getUser().roles
    }
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    /*
    this.authService.login(email!, password!)
      .subscribe(() => {
        this.isLoggedIn = true
        this.router.navigate(['/']);
      });*/
      
   this.authService.login(email!, password!)
      .subscribe({
        next: data => {
          this.userService.saveUser(data)
          console.log(data);
          
          this.isLoggedIn = true
      
          this.router.navigate(['/'])
        },
        error: err => {
          this.errorMessage = err.error.message;
       
        }
      })
  }

  //reloadPage(): void {
  //  window.location.reload()
 // }
}

