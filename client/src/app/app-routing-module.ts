import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ScriptSubmissionComponent} from './components/script-submission/script-submission.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {AuthGuard} from "./components/login-service/auth-guard";
import {ScriptDetailsComponent} from './components/script-details/script-details.component';
import {NewFeedbackRequestComponent} from './components/new-feedback-request/new-feedback-request.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'script-submission', component: ScriptSubmissionComponent, canActivate: [AuthGuard]},
    {path: 'user', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: 'script-details/:scriptId', component: ScriptDetailsComponent, canActivate: [AuthGuard]},
    {path: 'new-feedback-request', component: NewFeedbackRequestComponent, canActivate: [AuthGuard]},
    {path: 'new-feedback-request/:scriptId', component: NewFeedbackRequestComponent, canActivate: [AuthGuard]},
    {path: 'user/:userId', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: 'user/:userId/section/:section', component: UserProfileComponent, canActivate: [AuthGuard]},
    // TODO feedback submission route.
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
