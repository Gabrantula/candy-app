import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/profile/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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

  constructor(private userService: UserService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
