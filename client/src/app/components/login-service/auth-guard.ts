/**
 * Created by mac on 7/28/17.
 */

import { Injectable }     from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot}    from '@angular/router';
import {Observable} from "rxjs/Observable";
import {LoginService} from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            this.loginService.getCurrentUserInfoFromServer().then((resp) => {
                resolve(true);
            }, (err) => {
                reject(false);
            })
        })
    }
}
