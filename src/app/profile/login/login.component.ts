import { Component, OnInit } from '@angular/core';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
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
 
  errorMessage = ''
  
  constructor(private authService: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder,) { }

  login(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;
      
   this.authService.login(email!, password!)
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
          this.router.navigate(['/'])
        },
        error: (err) => {
          if(err.status === 403) {
            alert('Wrong Email or Password')
            this.errorMessage = err.error.message;
          } else {
            
            this.errorMessage = err.error.message;
            alert(this.errorMessage)
          }
        }
      })
  }
  ngOnInit(): void {
  localStorage.clear()
  this.authService.isLoggedIn = false
    
  }
 
}

