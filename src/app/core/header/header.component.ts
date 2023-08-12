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

user: string | undefined = ""
username: string | null = localStorage.getItem('username')

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

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.itIsLoggedIn()
    this.user= this.username!!
 
  }

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

  }
}
