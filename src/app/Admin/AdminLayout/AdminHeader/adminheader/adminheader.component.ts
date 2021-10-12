import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss']
})
export class AdminheaderComponent implements OnInit {
  public pushRightClass: string;
    userdetail: any;
  constructor(public router: Router) { 
    this.router.events.subscribe(val => {
      if (
          val instanceof NavigationEnd &&
          window.innerWidth <= 992 &&
          this.isToggled()
      ) {
          this.toggleSidebar();
      }
  });
  }

  ngOnInit() {
    // $('#exampleModal').modal('show');
    this.pushRightClass = 'push-right';
    this.userdetail=JSON.parse(localStorage.getItem('companyDetails'));
}

isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
}

toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
}

rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
}

onLoggedout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('companyDetails')
}

}
