import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, XHRBackend, Http} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing-module";
import {LoginService} from "./components/login-service/login.service";
import {LoginPageComponent} from './components/login-page/login-page.component';
import {LoginFormComponent} from './components/login-page/login-form/login-form.component';
import {RegistrationFormComponent} from './components/login-page/registration-form/registration-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {GidHttpService} from "./components/gid-api/gid-http.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScriptsDisplayComponent } from './components/scripts-display/scripts-display.component';
import { DashboardActionsComponent } from './components/dashboard-actions/dashboard-actions.component';
import { ScriptSubmissionComponent } from './components/script-submission/script-submission.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {AuthGuard} from "./components/login-service/auth-guard";
import {ScriptsService} from "./components/scripts-service/scripts.service";
import { SingleScriptDisplayComponent } from './components/single-script-display/single-script-display.component';
import { ScriptDetailsComponent } from './components/script-details/script-details.component';
import {FeedbackService} from "./components/feedback-service/feedback.service";
import { NewFeedbackRequestComponent } from './components/new-feedback-request/new-feedback-request.component';
import { OrderByPropertyPipe } from './pipes/order-by-property.pipe';
import { SuggestedScriptsDisplayComponent } from './components/suggested-scripts-display/suggested-scripts-display.component';
import {UsersService} from "./components/users-service/users.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        LoginFormComponent,
        RegistrationFormComponent,
        HomePageComponent,
        NavbarComponent,
        DashboardComponent,
        ScriptsDisplayComponent,
        DashboardActionsComponent,
        ScriptSubmissionComponent,
        UserProfileComponent,
        SingleScriptDisplayComponent,
        ScriptDetailsComponent,
        NewFeedbackRequestComponent,
        OrderByPropertyPipe,
        SuggestedScriptsDisplayComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        LoginService,
        AuthGuard,
        ScriptsService,
        FeedbackService,
        UsersService,
        {provide: Http, useFactory: GidHttpService.newInstance, deps: [XHRBackend, RequestOptions]},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
