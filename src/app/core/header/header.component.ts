import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

username=''
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

  constructor(public authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.itIsLoggedIn()
   this.username!= this.authService.userValue?.username 
  }
  /*
get isLoggedIn(): boolean {
  const user = this.userService.getUser()
  this.username= user.username
  return this.userService.isLoggedIn();

}
*/
itIsLoggedIn(): void {
  if(localStorage.getItem('accessToken')) {
  
    this.authService.isLoggedIn = true
   
  } else {
    this.authService.isLoggedIn = false
  }
}

  logout(): void {

    localStorage.clear()
    this.authService.isLoggedIn = false
    this.router.navigate(['/auth/login'])
/*
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.userService.clean()
     
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        console.log(err);
        this.router.navigate(['/auth/login']);
      }
    })
 */
  }
}
