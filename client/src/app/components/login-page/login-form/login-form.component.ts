import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
    selector: 'gid-login-form',
    templateUrl: 'login-form.component.html',
    styleUrls: ['login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    emailError: String;
    passwordError: String;

    constructor() {
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
        this.wipeErrors();
    }

    wipeErrors() {
        this.emailError = null;
        this.passwordError = null;
    }

    login(form) {

    }

}
