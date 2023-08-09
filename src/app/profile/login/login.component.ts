import { Component } from '@angular/core';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  appEmailDomains= DEFAULT_EMAIL_DOMAINS

  constructor(private userService: UserService, private router: Router) {}

 /* login(form: NgForm) {
    if(form.invalid) {
      return
    }

    const { email, password } = form.value

    this.userService.login(email, password).subscribe((res: any) => {
      console.log('res', res.accessToken);
      localStorage.setItem("auth-token", res.accessToken)
      
      this.router.navigate(['/home'])
    })
  }*/
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
  
    const { email, password } = form.value;
  
    this.userService.login(email, password).subscribe(
      (res: any) => {
        console.log('Login response:', res); // Log the entire response object
  
        if (res && res.accessToken) {
          console.log('res', res.accessToken);
          localStorage.setItem('auth-token', res.accessToken);
          this.router.navigate(['/home']);
        } else {
          console.error('Login response does not have accessToken property');
        }
      },
      (error) => {
        console.error('Login error:', error);
        // Handle the error as needed
      }
    );
  }
  
  
}
