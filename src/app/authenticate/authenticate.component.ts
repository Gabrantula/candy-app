/*import { Component, OnInit } from '@angular/core';
import { UserService } from '../profile/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})

export class AuthenticateComponent implements OnInit {
  isAuthenticated = true

  email: string = ''
  password: string = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.login(this.email, this.password).subscribe({
      next: () => {
        this.isAuthenticated = true
      
      },
      error: () => {
        // this.isAuthenticated = true
        this.isAuthenticated = false
      }
    })
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../profile/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticated = true;
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticated = false;
      },
      error: () => {
        this.isAuthenticated = false;
      },
      complete: () => {
        this.isAuthenticated = false;
      },
    });
  }

  /*
  login(form: NgForm): void {
    if (form.valid) {
      this.userService.login(this.email, this.password).subscribe({
        next: () => {
          this.isAuthenticated = true;
          // Redirect or perform actions after successful login
        },
        error: () => {
          this.isAuthenticated = false;
          // Handle login error, display error messages, etc.
        }
      });
    }
  }
  */
}
