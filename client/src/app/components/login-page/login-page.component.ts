import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login-service/login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'gid-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    loginOrRegister: String;

    constructor(private loginService: LoginService, private router: Router) {
    }

    ngOnInit() {
        if (this.loginService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
        this.loginOrRegister = 'Login';
    }

    openLogin() {
        this.loginOrRegister = 'Login';
    }

    openRegister() {
        this.loginOrRegister = 'Register';
    }

}
