import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'gid-registration-form',
    templateUrl: 'registration-form.component.html',
    styleUrls: ['registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
    registrationForm: FormGroup;
    emailError: String;
    passwordError: String;
    confirmPasswordError: String;
    firstNameError: String;

    constructor() {
    }

    ngOnInit() {
        this.registrationForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
            lastName: new FormControl('', Validators.maxLength(20))
        });
        this.wipeErrors();
    }

    wipeErrors() {
        this.emailError = null;
        this.passwordError = null;
        this.confirmPasswordError = null;
        this.firstNameError = null;
    }

    register(form) {
        if (this.validateRegistration(form)) {
            console.log('Now register');
        }
    }

    validateRegistration(form) {
        this.validateEmail(form.controls.email);
        this.validatePassword(form.controls.password, form.controls.confirmPassword);
        this.validateFirstName(form.controlls.name);
        return !this.emailError && !this.passwordError && !this.confirmPasswordError && !this.firstNameError;
    }

    validateEmail(email) {
        this.emailError = null;
        if (email.errors && email.errors.required) {
            this.emailError = 'Email is required';
        } else if (!/.+@.+\..+/.test(email.value)) {
            this.emailError = 'Please enter a valid e-mail';
        }
    }

    validatePassword(formPassword, formConfirmation) {
        this.passwordError = null;
        this.confirmPasswordError = null;
        if (formPassword.value.length < 5) {
            this.passwordError = 'Password must be at least 5 characters'
        }

        if (!this.passwordError) {
            this.validatePasswordConfirmation(formPassword, formConfirmation)
        }
    }

    validatePasswordConfirmation(formPassword, formConfirmation) {
        this.confirmPasswordError = null;
        if (formPassword.value !== formConfirmation.value) {
            this.confirmPasswordError = 'Passwords do not match';
        }
    }

    validateFirstName(formFirstName) {
        this.firstNameError = null;
        if (!formFirstName.value) {
            this.firstNameError = 'Please enter a first name'
        }
    }

}
