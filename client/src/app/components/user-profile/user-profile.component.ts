import {Component, OnInit} from '@angular/core';
import {ScriptsService} from "../scripts-service/scripts.service";
import {Script} from '../../interfaces/script';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../login-service/login.service";
import {UsersService} from "../users-service/users.service";
import {FeedbackService} from "../feedback-service/feedback.service";
import {Feedback} from "../../interfaces/feedback";

@Component({
    selector: 'gid-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    userScripts: Array<Script> = [];
    title: string;
    ownProfile: boolean = false;
    activeSection: string = 'scripts';
    outstandingFeedback: Array<Feedback>;

    constructor(private scriptsService: ScriptsService,
                private router: Router,
                private route: ActivatedRoute,
                private loginService: LoginService,
                private usersService: UsersService,
                private feedbackService: FeedbackService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            if (params.section) {
                this.activeSection = params.section;
            }

            if (!params.userId || params.userId === 'current' || params.userId === this.loginService.userInfo._id) {
                // This is your own profile.
                this.ownProfile = true;
                this.title = 'My Profile';

                this.scriptsService.getMyScripts().then((resp) => {
                    this.userScripts = resp;
                }, (err) => {
                    console.debug(err);
                    // Do Nothing.
                });

                this.feedbackService.getFeedbackForUser(this.loginService.userInfo._id).then((resp) => {
                    this.outstandingFeedback = resp;
                    console.log(this.outstandingFeedback);
                }, (err) => {
                    console.debug(err);
                })


            } else {
                this.usersService.getUserInfo(params.userId).then((resp) => {
                    this.title = 'Profile: ' + resp.firstName;
                    if (resp.lastName) {
                        this.title += ' ' + resp.lastName;
                    }
                    this.scriptsService.getScriptsForUser(params.userId).then((resp) => {
                        this.userScripts = resp.scripts;
                        console.log(this.userScripts);
                    }, (err) => {
                        console.debug(err);
                    })
                }, (err) => {
                    this.router.navigate(['home']);
                })
            }
        });
    }

    selectScript(script: Script) {
        this.router.navigate([`script-details`, script._id])
    }

    viewScript(scriptId) {
        this.scriptsService.viewScript(scriptId);
    }

    submitFeedback(feedback: Feedback) {
        this.router.navigate([`feedback-submission`, feedback._id]);
    }

    goToAuthorPage(userId) {
        this.router.navigate(['user', userId]);
    }

}
