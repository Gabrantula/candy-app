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

  login(form: NgForm) {
    if(form.invalid) {
      return
    }

    const { email, password } = form.value

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }
}
