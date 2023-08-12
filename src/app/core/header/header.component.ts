import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 // private roles: string[] =[]
  //isLoggedIn = false
  username?: string

  index = 0
  btnClass: any;
  iptClass: any;

  tabChange(data: number) {
    this.index = data
  }
  btnClickHandler() {
    if(this.btnClass) {
      this.btnClass = ''
      this.iptClass = ''
    }
    else {
      this.btnClass = 'close'
      this.iptClass = 'square'
    }
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }
/*
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }
*/
/*ngOnInit(): void {
  this.isLoggedIn = this.userService.isLoggedIn()

  if(this.isLoggedIn) {
    const user = this.userService.getUser()
   // this.roles = user.roles

   this.username= user.username
  }

}*/

get isLoggedIn(): boolean {
  const user = this.userService.getUser()
  this.username= user.username
  return this.userService.isLoggedIn();

}
/*
get username(): string {
  return this.userService.user?.username || '';
}*/
  logout(): void {

    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.userService.clean()
        
       // window.location.reload()
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        console.log(err);
        this.router.navigate(['/auth/login']);
      }
    })
    /*
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });*/
  }
}
