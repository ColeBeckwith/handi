import {Component, OnInit} from '@angular/core';
import {ScriptsService} from "../scripts-service/scripts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Script} from "../../interfaces/script";
import {FeedbackRequest} from "../../interfaces/feedback-request";
import {LoginService} from "../login-service/login.service";
import {FeedbackService} from "../feedback-service/feedback.service";

@Component({
    selector: 'gid-new-feedback-request',
    templateUrl: './new-feedback-request.component.html',
    styleUrls: ['./new-feedback-request.component.scss']
})
export class NewFeedbackRequestComponent implements OnInit {
    scripts: Array<Script>;
    feedbackRequest: FeedbackRequest;

    constructor(private scriptsService: ScriptsService,
                private feedbackService: FeedbackService,
                private router: Router,
                private route: ActivatedRoute,
                public loginService: LoginService) {
    }

    ngOnInit() {
        this.feedbackRequest = new FeedbackRequest();
        this.feedbackRequest.daysAllowed = 7;
        this.feedbackRequest.minimumReviewerRating = 0;
        this.feedbackRequest.creditsOffered = 5;
        this.feedbackRequest.maxReviews = 1;
        this.scriptsService.getMyScripts().then((scripts: Array<Script>) => {
            this.scripts = scripts;
            if (scripts.length === 0) {
                this.router.navigate(['/home']);
            }
            this.route.params.subscribe((params: any) => {
                if (params.scriptId) {
                    this.feedbackRequest.scriptId = params.scriptId;
                    console.log(this.feedbackRequest);
                    // this.scripts.forEach((script) => {
                    //     console.log(script, params.scriptId);
                    //     if (script._id === params.scriptId) {
                    //         console.log(script);
                    //         this.feedbackRequest.scriptId = params.scriptId;
                    //     }
                    // })
                }
            });
        }, (err) => {
            this.router.navigate(['/home']);
        });
    }

    submitFeedbackRequest() {
        if ((this.feedbackRequest.creditsOffered * this.feedbackRequest.maxReviews) > this.loginService.userInfo.availableCredits) {
            // TODO signal error to the user here.
            return;
        }
        this.feedbackService.createNewFeedbackRequest(this.feedbackRequest).then((resp) => {
            console.log(resp);
            this.router.navigate([`/script-details/${this.feedbackRequest.scriptId}`]);
        }, (err) => {
            console.debug(err);
        })
    }

}
