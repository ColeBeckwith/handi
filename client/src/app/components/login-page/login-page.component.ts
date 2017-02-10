import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'gid-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    loginOrRegister: String;

    constructor() {
    }

    ngOnInit() {
        this.loginOrRegister = 'Login';
    }

    openLogin() {
        this.loginOrRegister = 'Login';
    }

    openRegister() {
        this.loginOrRegister = 'Register';
    }

}
