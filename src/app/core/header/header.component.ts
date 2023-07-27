import { Component } from '@angular/core';

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
}
