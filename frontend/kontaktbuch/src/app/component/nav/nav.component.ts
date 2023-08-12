import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isActive: boolean = false;
  mobileNav(){
    this.isActive = !this.isActive;
    const navUl = document.querySelector('#nav')as HTMLElement;
    this.isActive ? navUl.style.display = 'block' : navUl.style.display = 'none';    
  }

}
