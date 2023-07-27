import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
//export class AuthenticateComponent implements OnInit{
  isAuthenticated= true

 /* constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticated= false
      },
      error: () => {
        this.isAuthenticated= false
      },
      complete: () => {
        this.isAuthenticated= false
      }
    })
  }*/
}
