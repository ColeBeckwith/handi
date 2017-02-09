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
    }

    openLogin() {
        this.loginOrRegister = 'Login';
    }

    openRegister() {
        this.loginOrRegister = 'Register';
    }

    checkValidRegistration(form) {
        this.wipeErrors();
        if (form.contrls.password.value.length < 5) {
            this.passwordError = 'Passwords must be at least 5 characters long.';
        } else if (form.controls.password.value !== form.controls.confirmPassword.value) {
            this.confirmPasswordError = 'Passwords do not match';
        }
    }

}
