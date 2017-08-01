import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {ScriptSubmissionComponent} from './components/script-submission/script-submission.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {AuthGuard} from "./components/login-service/auth-guard";
import {ScriptDetailsComponent} from './components/script-details/script-details.component';
import {NewFeedbackRequestComponent} from './components/new-feedback-request/new-feedback-request.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'script-submission', component: ScriptSubmissionComponent, canActivate: [AuthGuard]},
    {path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]},
    {path: 'script-details/:scriptId', component: ScriptDetailsComponent, canActivate: [AuthGuard]},
    {path: 'new-feedback-request', component: NewFeedbackRequestComponent, canActivate: [AuthGuard]},
    {path: 'new-feedback-request/:scriptId', component: NewFeedbackRequestComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
