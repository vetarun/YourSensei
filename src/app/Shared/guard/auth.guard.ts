import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(url) {

        if (localStorage.getItem('isLoggedin')) {
            
            var time = new Date(localStorage.getItem('TimeOut'))

            var Currenttime = new Date()
            var oms = time.getTime()
            var cms = Currenttime.getTime()
            var def = cms - oms



            if ((((def / 1000) / 60) > 60)) {
                this.router.navigate(['/Main/login']);
                return false
            }
            else if (localStorage.getItem('isExpired') == 'true') {

                this.router.navigate(['/Main/subscription']);

                return false

            }
            else {
                return true;
            }
        } else {
            this.router.navigate(['/Main/login'], { queryParams: { 'redirectURL': url._routerState.url } });
            return false
        }

    }
}

