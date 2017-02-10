import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {LoginService} from "../../login-service/login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'gid-login-form',
    templateUrl: 'login-form.component.html',
    styleUrls: ['login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    emailError: String;
    passwordError: String;
    generalError: String;

    constructor(private loginService: LoginService,
                private router : Router) {
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

    logIn(form) {
        this.wipeErrors();
        this.validateEmail(form.controls.email);
        if (!form.controls.password.value) {
            this.passwordError = 'Please enter a password.'
        }
        if (!this.emailError && !this.passwordError) {
            this.loginService.logIn({
                email: form.controls.email.value,
                password: form.controls.password.value
            }).then((resp) => {
                this.router.navigate(['/home']);
            }, (reject) => {
                this.generalError = reject;
            });
        }
    }

    validateEmail(email) {
        this.emailError = null;
        if (email.errors && email.errors.required) {
            this.emailError = 'Email is required';
        } else if (!/.+@.+\..+/.test(email.value)) {
            this.emailError = 'Please enter a valid e-mail';
        }
    }

}
