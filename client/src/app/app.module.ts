import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing-module";
import {LoginService} from "./components/login-service/login.service";
import {LoginPageComponent} from './components/login-page/login-page.component';
import {LoginFormComponent} from './components/login-page/login-form/login-form.component';
import {RegistrationFormComponent} from './components/login-page/registration-form/registration-form.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        LoginFormComponent,
        RegistrationFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
