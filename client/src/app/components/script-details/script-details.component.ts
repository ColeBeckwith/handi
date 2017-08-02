import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScriptsService} from "../scripts-service/scripts.service";
import {Script} from '../../interfaces/script';
import {FeedbackService} from "../feedback-service/feedback.service";
import {FeedbackRequest} from "../../interfaces/feedback-request";
import {Feedback} from "../../interfaces/feedback";
import {LoginService} from "../login-service/login.service";

@Component({
    selector: 'gid-script-details',
    templateUrl: './script-details.component.html',
    styleUrls: ['./script-details.component.scss']
})
export class ScriptDetailsComponent implements OnInit {
    script: Script;
    feedbackRequests: Array<FeedbackRequest>;
    feedback: Array<Feedback>;
    userOwnsScript: boolean = false;
    optimalFeedbackRequest: FeedbackRequest;

    constructor(private route: ActivatedRoute,
                private scriptsService: ScriptsService,
                private feedbackService: FeedbackService,
                private router: Router,
                private loginService: LoginService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            if (params.scriptId) {
                // Get The Script
                this.scriptsService.getScript(params.scriptId).then((resp) => {
                    this.script = resp;
                    if (this.loginService.userInfo && this.loginService.userInfo._id === this.script.userId) {
                        this.userOwnsScript = true;
                    }

                    // Get The Requests
                    if (this.userOwnsScript) {
                        this.feedbackService.getAllRequestsForScript(params.scriptId).then((resp) => {
                            this.feedbackRequests = resp;
                        }, (err) => {
                            console.debug(err);
                        });
                    } else {
                        this.feedbackService.getOptimalFeedbackRequestForScript(params.scriptId, this.loginService.userInfo).then((resp) => {
                            this.optimalFeedbackRequest = resp;
                        });
                    }

                    // Get The Feedback
                    this.feedbackService.getAllFeedbackForScript(params.scriptId).then((resp) => {
                        this.feedback = resp;
                    }, (err) => {
                        console.debug(err)
                    });
                }, (error) => {
                    console.debug(error);
                });


            } else {
                console.debug('Invalid Script id in Params.')
            }

        });
    }

    viewScript() {
        this.scriptsService.viewScript(this.script._id);
    }

    createFeedbackRequest() {
        this.router.navigate([`/new-feedback-request/${this.script._id}`]);
    }

    triggerNewVersionUpload() {
        document.getElementById('scriptUploadInput').click();
    }

    uploadNewVersion(event) {
        this.scriptsService.uploadScript(this.script, event.target.files[0]).then((resp) => {
            // TODO add toastr here.
        }, (err) => {
            console.debug(err);
        });
    }

    deleteScript() {
        if (confirm(`Are you sure you want to delete ${this.script.name}? It will not be possible to recover.`)) {
            this.scriptsService.deleteScript(this.script).then((resp) => {
                // TODO add toastr here.
                this.router.navigate(['home']);
            }, (err) => {
                // Do nothing.
            })
        }
    }

    cancelFeedbackRequest(feedbackRequest: FeedbackRequest) {
        this.feedbackService.cancelFeedbackRequest(feedbackRequest).then((resp) => {
            this.feedbackService.getAllRequestsForScript(this.script._id).then((resp) => {
                this.feedbackRequests = resp;
            });
        }, (err) => {
            // Do nothing.
        });
    }

    goToUserPage() {
        this.router.navigate([`user/${this.script.userId}`]);
    }


}
